import { IPayee, ITransaction } from '@mammoth/api-interfaces'
import { Injectable, Logger } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { NodeRelationship, SupportedLabel } from '../constants'
import {
  CommonAccountService,
  IAccountBalanceRequest,
  IAccountLinkedNodeMeta,
  IAccountLinkRequest,
  ICommonAccountConverter,
} from '../extensions'
import { Neo4jService } from '../neo4j'
import { CreatePayee } from './dto'

@Injectable()
export class PayeeService extends CommonAccountService implements ICommonAccountConverter {
  protected readonly logger = new Logger(PayeeService.name)

  constructor(protected neo4jService: Neo4jService) {
    super(neo4jService)
  }

  /**
   * Create a payee and return the newly created payee
   *
   * @param {CreatePayee} createRequest
   * @returns {Promise<IPayee>}
   * @memberof PayeeService
   */
  public async createPayee(createRequest: CreatePayee): Promise<IPayee> {
    this.logger.log(`Creating a payee with name ${createRequest.name}`)
    const payee = 'node'
    const statementResult = await this.neo4jService.executeStatement({
      statement: `
        MATCH (budget:Budget {id: $budgetId})
        CREATE (${payee}:${SupportedLabel.Payee} $nodeProps)
        MERGE (${payee})-[r:${NodeRelationship.PayeeOf}]->(budget)
        RETURN ${payee}
      `,
      props: {
        budgetId: createRequest.budgetId,
        nodeProps: {
          ...createRequest,
          createdDate: new Date().toISOString(),
          id: uuid(),
        },
      },
    })
    return this.neo4jService.flattenStatementResult<IPayee>(statementResult, payee)[0]
  }

  /**
   * Get all the payees for a given budget
   *
   * @param {string} budgetId
   * @returns {Promise<IPayee[]>}
   * @memberof PayeeService
   */
  public async getAllPayees(budgetId: string): Promise<IPayee[]> {
    this.logger.log(`Getting all the payees that match budgetId - ${budgetId}`)
    const nodes = 'payees'
    const statementResult = await this.neo4jService.executeStatement({
      statement: `
        MATCH (${nodes}:${SupportedLabel.Payee} { budgetId: $budgetId })
        RETURN ${nodes}
      `,
      props: {
        budgetId,
      },
    })
    return this.neo4jService.flattenStatementResult<IPayee>(statementResult, nodes)
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
