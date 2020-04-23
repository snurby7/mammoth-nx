import { IAccount, ITransaction } from '@mammoth/api-interfaces';
import { Injectable, Logger } from '@nestjs/common';
import * as uuid from 'uuid/v4';
import { SupportedLabel } from '../constants';
import {
  CommonAccountService,
  IAccountBalanceRequest,
  IAccountLinkedNodeMeta,
  IAccountLinkRequest,
  ICommonAccountConverter,
} from '../extensions';
import { Neo4jService } from '../neo4j';
import { AccountQuery, CreateAccount, UpdateAccount } from './dto';

@Injectable()
export class AccountService extends CommonAccountService
  implements ICommonAccountConverter {
  protected readonly logger = new Logger(AccountService.name);
  private readonly AccountRelationship = 'ACCOUNT_OF';
  public readonly AccountLabel = 'Account';

  constructor(protected neo4jService: Neo4jService) {
    super(neo4jService);
  }

  /**
   * Create a new account, something like a credit card or checking account.
   *
   * @param {CreateAccountDto} accountRequest
   * @returns {Promise<IAccount>}
   * @memberof AccountService
   */
  public async createAccount(accountRequest: CreateAccount): Promise<IAccount> {
    this.logger.log('Creating an account');
    const account = 'node';
    const statementResult = await this.neo4jService.executeStatement({
      statement: `
        MATCH (budget:Budget {id: $budgetId})
        CREATE (${account}:${this.AccountLabel} $nodeProps)
        MERGE (${account})-[r:${this.AccountRelationship}]->(budget)
        RETURN ${account}
      `,
      props: {
        budgetId: accountRequest.budgetId,
        nodeProps: {
          ...accountRequest,
          createdDate: new Date().toISOString(),
          id: uuid(),
        },
      },
    });
    return this.neo4jService.flattenStatementResult<IAccount>(
      statementResult,
      account
    )[0];
  }

  /**
   * Find all the given categories that below to a certain budget
   *
   * @param {AccountQueryDto} query
   * @returns {Promise<IAccount[]>}
   * @memberof AccountService
   */
  public async findAccounts(query: AccountQuery): Promise<IAccount[]> {
    this.logger.log(`Finding accounts with budgetId - ${query.budgetId}`);
    const nodes = 'accounts';
    const statementResult = await this.neo4jService.executeStatement({
      statement: `
        MATCH (${nodes}:${this.AccountLabel} {budgetId: $budgetId})
        RETURN ${nodes}
        ${query.limit ? `LIMIT ${query.limit}` : ''}
      `,
      props: {
        budgetId: query.budgetId,
      },
    });
    return this.neo4jService.flattenStatementResult<IAccount>(
      statementResult,
      nodes
    );
  }

  /**
   * Find a single account, no need for a budgetId, but it might help with less iteration, maybe a future
   * update can fix that one.
   *
   * @param {string} id
   * @returns {Promise<IAccount>}
   * @memberof AccountService
   */
  public async findAccount(id: string): Promise<IAccount> {
    this.logger.log(`Finding account with ${id}`);
    const node = 'account';
    const statementResult = await this.neo4jService.executeStatement({
      statement: `
        MATCH (${node}:${this.AccountLabel} {id: $accountId})
        RETURN ${node}
      `,
      props: {
        accountId: id,
      },
    });
    return this.neo4jService.flattenStatementResult<IAccount>(
      statementResult,
      node
    )[0];
  }

  /**
   * Updates an accounts name and balance, more properties will need to be added later.
   *
   * @param {UpdateAccountDto} {
   *     id,
   *     budgetId,
   *     name,
   *     balance,
   *   }
   * @returns {Promise<IAccount>}
   * @memberof AccountService
   */
  public async saveAccount(request: UpdateAccount): Promise<IAccount> {
    const { id, budgetId, name, balance } = request;
    this.logger.log(`Updating an account with ${id}`);
    const node = 'account';
    const statementResult = await this.neo4jService.executeStatement({
      statement: `
        MATCH (${node}:${this.AccountLabel} {id: $accountId, budgetId: $budgetId})
        SET ${node} += {name: $updatedName, balance: $updatedBalance}
        RETURN ${node}
      `,
      props: {
        accountId: id,
        budgetId,
        updatedName: name,
        updatedBalance: balance,
      },
    });
    return this.neo4jService.flattenStatementResult<IAccount>(
      statementResult,
      node
    )[0];
  }

  /**
   * Delete an account
   *
   * @param {string} id
   * @returns {Promise<{ message: string }>}
   * @memberof AccountService
   */
  public async deleteAccount(id: string): Promise<{ message: string }> {
    this.logger.debug(`Deleting account - ${id}`);
    const result = await this.neo4jService.executeStatement({
      statement: `
        MATCH (node:${this.AccountLabel} { id: '${id}' })
        DETACH DELETE node
      `,
    });
    this.logger.debug(`Deleted category - ${id}`);
    this.logger.verbose(
      `Deleted ${
        result.summary.counters.updates().relationshipsDeleted
      } relationship(s)`
    );
    return {
      message: `Deleted ${
        result.summary.counters.updates().relationshipsDeleted || 0
      } record(s)`,
    };
  }

  /**
   * Converts the transaction into something that can be used to reference an Account
   *
   * @param {ITransaction} transaction Transaction to scrape data out of
   * @param {number} transactionAmount The transaction amount (+, -, 0)
   * @returns {IAccountLinkedNodeMeta}
   * @memberof AccountService
   */
  public convertTransactionToAccountLink(
    transaction: ITransaction,
    transactionAmount: number
  ): IAccountLinkedNodeMeta {
    return {
      id: transaction.accountId,
      label: SupportedLabel.Account,
      budgetId: transaction.budgetId,
      amount: transactionAmount,
    };
  }

  /**
   * Convert a stored transaction and it's updated request to a LinkResponse
   *
   * @param {ITransaction} currentTransaction
   * @param {ITransaction} transactionUpdateRequest
   * @param {string} linkingRelationship
   * @param {number} currentTransactionAmount
   * @param {number} updatedTransactionRequestAmount
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
      id: currentTransaction.accountId,
      label: SupportedLabel.Account,
      isBalanceDifferent:
        currentTransaction.inflow !== transactionUpdateRequest.inflow ||
        currentTransaction.outflow !== transactionUpdateRequest.outflow,
      chargeAmount: updatedTransactionRequestAmount,
      refundAmount: -currentTransactionAmount,
      budgetId: currentTransaction.budgetId,
    };

    return {
      storedTransactionDetails: {
        id: currentTransaction.id,
        label: SupportedLabel.Transaction,
        budgetId: currentTransaction.budgetId,
        relationship: linkingRelationship,
        balanceRequest: currentNodeRelationship,
      },
      currentTransactionLinkDetails: {
        id: currentTransaction.accountId,
        amount: -currentTransactionAmount, // invert the current amount to refund it
        label: SupportedLabel.Account,
        budgetId: currentTransaction.budgetId,
      },
      newLinkDetails: {
        id: transactionUpdateRequest.accountId,
        amount: updatedTransactionRequestAmount,
        label: SupportedLabel.Account,
        budgetId: transactionUpdateRequest.budgetId,
      },
    };
  }
}
