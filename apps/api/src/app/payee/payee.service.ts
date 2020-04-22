import { Injectable, Logger } from '@nestjs/common'
import * as uuid from 'uuid/v4'
import { IPayee, ITransaction, Relationship, SupportedLabel } from '../common'
import {
  CommonAccountService,
  IAccountBalanceRequest,
  IAccountLinkedNodeMeta,
  IAccountLinkRequest,
  ICommonAccountConverter,
} from '../extensions'
import { Neo4jService } from '../neo4j'
import { CreatePayeeDto } from './dto/CreatePayeeDto'
import { PayeeQueryDto } from './dto/PayeeQueryDto'

@Injectable()
export class PayeeService extends CommonAccountService implements ICommonAccountConverter {
  protected readonly logger = new Logger(PayeeService.name)

  constructor(protected neo4jService: Neo4jService) {
    super(neo4jService)
  }

  /**
   * Create a payee and return the newly created payee
   *
   * @param {CreatePayeeDto} createRequest
   * @returns {Promise<IPayee>}
   * @memberof PayeeService
   */
  public async createPayee(createRequest: CreatePayeeDto): Promise<IPayee> {
    this.logger.log(`Creating a payee with name ${createRequest.name}`)
    const payee = 'node'
    const statementResult = await this.neo4jService.executeStatement({
      statement: `
        MATCH (budget:Budget {id: $budgetId})
        CREATE (${payee}:${SupportedLabel.Payee} $nodeProps)
        MERGE (${payee})-[r:${Relationship.PayeeOf}]->(budget)
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
   * Get all the payees that match the query
   *
   * @param {PayeeQueryDto} query
   * @returns {Promise<IPayee[]>}
   * @memberof PayeeService
   */
  public async getAllPayees(query: PayeeQueryDto): Promise<IPayee[]> {
    this.logger.log(`Getting all the payees that match budgetId - ${query.budgetId}`)
    const nodes = 'payees'
    const statementResult = await this.neo4jService.executeStatement({
      statement: `
        MATCH (${nodes}:${SupportedLabel.Payee} { budgetId: $budgetId })
        RETURN ${nodes}
        ${query.limit ? `LIMIT ${query.limit}` : ''}
      `,
      props: {
        budgetId: query.budgetId,
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
  public convertTransactionToAccountLink(transaction: ITransaction, transactionAmount: number): IAccountLinkedNodeMeta {
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
    updatedTransactionRequestAmount: number,
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
