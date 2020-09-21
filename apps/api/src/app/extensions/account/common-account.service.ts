import { Injectable, Logger } from '@nestjs/common'
import { forkJoin, Observable, of, throwError } from 'rxjs'
import { catchError, first, flatMap, map, switchMap } from 'rxjs/operators'
import { CommonQueries } from '../../common-queries'
import { getRecordsByKey, IMammothCoreNode, Neo4jService } from '../../neo4j'
import {
  IAccountLinkBreak,
  IAccountLinkedNodeMeta,
  IAccountLinkRequest,
  IAccountLinkResponse,
} from './contracts'
import { updateLinkedNodeBalance } from './queries'

@Injectable()
export class CommonAccountService {
  protected readonly logger = new Logger(CommonAccountService.name)

  public constructor(protected neo4jService: Neo4jService) {}

  /**
   * Calling this method will do one of the following
   *   1. It will remove a link if the refundId and the attachId values are different, it will refund the previous link
   *      and then it will associate the record to the new link and charge that one accordingly.
   *   2. If the balance is different AND the attachId === refundId it will simply just update the currently linked account
   *
   * @param {IAccountLinkRequest} linkRequest
   * @memberof CommonAccountService
   */
  public updateLink$(linkRequest: IAccountLinkRequest): Observable<IAccountLinkResponse> {
    const { currentTransactionLinkDetails, storedTransactionDetails, newLinkDetails } = linkRequest

    if (newLinkDetails.id !== currentTransactionLinkDetails.id) {
      return forkJoin([
        this.neo4jService.removeTargetedRelationshipFromNode$(
          storedTransactionDetails.id,
          storedTransactionDetails.label,
          storedTransactionDetails.relationship
        ),
        this.updateLinkedNodeBalance$(newLinkDetails),
        this.updateLinkedNodeBalance$(currentTransactionLinkDetails),
      ]).pipe(
        switchMap(() =>
          this.neo4jService.createRelationshipBetweenNodes$(
            storedTransactionDetails,
            storedTransactionDetails.relationship,
            newLinkDetails
          )
        ),
        map(() => ({ message: 'Successfully unlinked and relinked' }))
      )
    } else if (storedTransactionDetails.balanceRequest.isBalanceDifferent) {
      return this.updateLinkedNodeBalance$({
        label: storedTransactionDetails.balanceRequest.label,
        id: storedTransactionDetails.balanceRequest.id,
        amount: storedTransactionDetails.balanceRequest.chargeAmount,
        budgetId: newLinkDetails.budgetId,
        refund: storedTransactionDetails.balanceRequest.refundAmount,
      }).pipe(map((_) => ({ message: 'Successfully updated balance' })))
    } else {
      return of({
        message: 'Nothing to update, the balances and links are the same',
      })
    }
  }

  /**
   * This is just going to update the currently associated balance. It will grab the previous balance and either add
   * the refund or the amount to charge the account.
   *
   * @param {IAccountLinkedNodeMeta} refund
   * @memberof CommonAccountService
   */
  public updateLinkedNodeBalance$<TResponse>(
    linkedAccountMeta: IAccountLinkedNodeMeta
  ): Observable<TResponse> {
    const resultKey = 'matchedNode'
    const { query, params } = CommonQueries.getNodeStatement(resultKey, {
      id: linkedAccountMeta.id,
      label: linkedAccountMeta.label,
      budgetId: linkedAccountMeta.budgetId,
    })
    return this.neo4jService.rxSession.writeTransaction(
      (txc) =>
        txc
          .run(query, params)
          .records()
          .pipe(
            first(),
            getRecordsByKey<any, number>(resultKey, (record) => record.balance ?? 0),
            flatMap((balance) =>
              this.setUpdatedBalanceOnNode$<TResponse>(balance, linkedAccountMeta)
            ),
            catchError((err) => throwError(err))
          ),
      { timeout: 4000 }
    )
  }

  /**
   * Update the balance on the given node
   *
   * @template TResponse
   * @param {number} updatedBalance The current node balance
   * @param {IAccountLinkedNodeMeta} linkedNode The data about the node to update.
   * @returns {Observable<TResponse>}
   * @memberof CommonAccountService
   */
  public setUpdatedBalanceOnNode$<TResponse>(
    currentBalance: number,
    linkedNode: IAccountLinkedNodeMeta
  ): Observable<TResponse> {
    const resultKey = 'linkedNode'
    const { query, params } = updateLinkedNodeBalance(resultKey, linkedNode, currentBalance)
    return this.neo4jService.rxSession.writeTransaction<TResponse>(
      (rxTransaction) =>
        rxTransaction
          .run(query, params)
          .records()
          .pipe(
            first(),
            getRecordsByKey<TResponse>(resultKey),
            catchError((err) => of(err))
          ),
      { timeout: 3000 }
    )
  }

  /**
   * This will chain two calls into one and will return when it's completed
   *  1. It will update the link balance, give it the money back or take it away given the transaction
   *  2. Remove the relationship between the node and whatever it points to. Given A --> relates_to -- B
   *     it will target any relationship from A that matches 'relates_to' and remove that.
   * @param {IAccountLinkBreak} removeWithRefund
   * @returns {Promise<void>}
   * @memberof CommonAccountService
   */
  public removeLinkWithRefund(removeWithRefund: IAccountLinkBreak): Observable<any> {
    const { account, transaction, budgetId, refundAmount, relationship } = removeWithRefund
    return forkJoin([
      this.updateLinkedNodeBalance$({
        id: account.id,
        label: account.label,
        budgetId,
        amount: refundAmount,
      }),
      this.neo4jService.removeTargetedRelationshipFromNode$(
        transaction.id,
        transaction.label,
        relationship
      ),
    ])
  }

  /**
   * A statement method that will return back the balance of the account.
   *
   * @param {string} id Id of the node
   * @param {string} label Label on a given node (e.g. node:Waffles this would be 'Waffles')
   * @param {string} budgetId Needs to be the budgetId currently to make it a little more targeted.
   * @deprecated
   *
   * TODO: Delete in favor of returning an Observable below
   *
   * @returns {Promise<number>}
   * @memberof CommonAccountService
   */
  public async getNodeBalance(request: IMammothCoreNode): Promise<number> {
    const { id, label, budgetId } = request
    const node = 'node'
    return await this.neo4jService
      .executeStatement({
        query: `
          MATCH (${node}:${label} {id: $id, budgetId: $budgetId})
          RETURN ${node}
        `,
        params: {
          id,
          budgetId,
        },
      })
      .then((statementResult) => {
        const [result] = this.neo4jService.flattenStatementResult<any>(statementResult, node)
        return result.balance || 0
      })
  }

  /**
   * Observable which will go to the given node.
   * ! It may not have a balance
   *
   * @param request The core node data to go retrieve
   */
  public getNodeBalance$(request: IMammothCoreNode): Observable<number> {
    const node = 'node'
    const { query, params } = CommonQueries.getNodeStatement(node, request)
    return this.neo4jService.rxSession.writeTransaction<number>((trx) =>
      trx
        .run(query, params)
        .records()
        .pipe(
          first(),
          getRecordsByKey<any, number>(node, (record) => record.balance ?? 0)
        )
    )
  }
}
