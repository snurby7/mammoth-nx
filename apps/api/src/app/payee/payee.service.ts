import { IPayee, ITransaction } from '@mammoth/api-interfaces'
import { Injectable, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { materialize, toArray } from 'rxjs/operators'
import { SupportedLabel } from '../constants'
import {
  CommonAccountService,
  IAccountBalanceRequest,
  IAccountLinkedNodeMeta,
  IAccountLinkRequest,
  ICommonAccountConverter,
} from '../extensions'
import { getRecordsByKey, getRecordsByKeyNotification, Neo4jService } from '../neo4j'
import { CreatePayee } from './dto'
import { payeeQueries } from './queries/payee.queries'

@Injectable()
export class PayeeService extends CommonAccountService implements ICommonAccountConverter {
  protected readonly logger = new Logger(PayeeService.name)

  constructor(protected neo4jService: Neo4jService) {
    super(neo4jService)
  }

  /**
   * Create a payee and return the newly created payee
   *
   * @param {CreatePayee} request
   * @returns {Observable<IPayee>}
   * @memberof PayeeService
   */
  public createPayee(request: CreatePayee): Observable<IPayee> {
    const resultKey = 'payee'
    const { statement, props } = payeeQueries.createPayee(resultKey, request)
    return this.neo4jService.rxSession.writeTransaction((trx) =>
      trx.run(statement, props).records().pipe(getRecordsByKey<IPayee>(resultKey))
    )
  }

  /**
   * Get all the payees for a given budget
   *
   * @param {string} budgetId
   * @returns {Observable<IPayee[]>}
   * @memberof PayeeService
   */
  public getAllPayees(budgetId: string): Observable<IPayee[]> {
    const resultKey = 'payees'
    const { statement, props } = payeeQueries.getAllPayeesByBudgetId(resultKey, budgetId)
    return this.neo4jService.rxSession.readTransaction((trx) =>
      trx
        .run(statement, props)
        .records()
        .pipe(materialize(), toArray(), getRecordsByKeyNotification(resultKey))
    )
  }

  /**
   * Converts the transaction into something that can be used to reference an Account
   *
   * @param {ITransaction} transaction Transaction to scrape data out of
   * @param {number} transactionAmount The transaction amount (+, -, 0)
   * @returns {IAccountLinkedNodeMeta}
   * @memberof CategoryService
   */
  public convertTransactionToAccountLink(
    transaction: ITransaction,
    transactionAmount: number
  ): IAccountLinkedNodeMeta {
    return {
      id: transaction.payeeId,
      label: SupportedLabel.Payee,
      budgetId: transaction.budgetId,
      amount: transactionAmount,
    }
  }

  /**
   * Convert a stored transaction and it's updated request to a LinkResponse
   *
   * @param {ITransaction} currentTransaction
   * @param {ITransaction} transactionUpdateRequest
   * @param {string} linkingRelationship
   * @returns {IAccountLinkResponse}
   * @memberof CategoryService
   */
  public convertToAccountLinkResponse(
    currentTransaction: ITransaction,
    transactionUpdateRequest: ITransaction,
    linkingRelationship: string,
    currentTransactionAmount: number,
    updatedTransactionRequestAmount: number
  ): IAccountLinkRequest {
    const currentNodeRelationship: IAccountBalanceRequest = {
      id: currentTransaction.payeeId,
      label: SupportedLabel.Payee,
      isBalanceDifferent:
        currentTransaction.inflow !== transactionUpdateRequest.inflow ||
        currentTransaction.outflow !== transactionUpdateRequest.outflow,
      chargeAmount: updatedTransactionRequestAmount,
      refundAmount: -currentTransactionAmount,
      budgetId: currentTransaction.budgetId,
    }

    return {
      storedTransactionDetails: {
        id: currentTransaction.id,
        label: SupportedLabel.Transaction,
        budgetId: currentTransaction.budgetId,
        relationship: linkingRelationship,
        balanceRequest: currentNodeRelationship,
      },
      currentTransactionLinkDetails: {
        id: currentTransaction.payeeId,
        amount: -currentTransactionAmount, // invert the current amount to refund it
        label: SupportedLabel.Payee,
        budgetId: currentTransaction.budgetId,
      },
      newLinkDetails: {
        id: transactionUpdateRequest.payeeId,
        amount: updatedTransactionRequestAmount,
        label: SupportedLabel.Payee,
        budgetId: transactionUpdateRequest.budgetId,
      },
    }
  }
}
