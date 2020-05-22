import {
  IAccount,
  IAccountQuery,
  ICreateAccount,
} from '@mammoth/api-interfaces';
import * as uuid from 'uuid/v4';
import { NodeRelationship, SupportedLabel } from '../../constants';
import { ExecuteStatement } from '../../neo4j';

/**
 * Account queries for handling the cypher queries.
 */
export const accountQueries = {
  createAccount: (
    resultKey: string,
    request: ICreateAccount
  ): ExecuteStatement => ({
    statement: `
        MATCH (${resultKey}:${SupportedLabel.Budget} {id: $budgetId})
        CREATE (${resultKey}:${SupportedLabel.Account} $nodeProps)
        MERGE (${resultKey})-[r:${NodeRelationship.AccountOf}]->(${resultKey})
        RETURN ${resultKey}
      `,
    props: {
      budgetId: request.budgetId,
      nodeProps: {
        ...request,
        createdDate: new Date().toISOString(),
        id: uuid(),
      },
    },
  }),

  findAccounts: (
    resultKey: string,
    request: IAccountQuery
  ): ExecuteStatement => ({
    statement: `
        MATCH (${resultKey}:${SupportedLabel.Account} {budgetId: $budgetId})
        RETURN ${resultKey}
        ${request.limit ? `LIMIT ${request.limit}` : ''}
      `,
    props: {
      budgetId: request.budgetId,
    },
  }),
  getAccountById: (
    resultKey: string,
    budgetId: string,
    accountId: string
  ): ExecuteStatement => ({
    statement: `
        MATCH (${resultKey}:${SupportedLabel.Account} {id: $accountId, budgetId: $budgetId})
        RETURN ${resultKey}
      `,
    props: {
      accountId,
      budgetId,
    },
  }),
  updateExistingAccount: (
    resultKey: string,
    request: IAccount
  ): ExecuteStatement => ({
    statement: `
        MATCH (${resultKey}:${SupportedLabel.Account} {id: $accountId, budgetId: $budgetId})
        SET ${resultKey} += {name: $updatedName, balance: $updatedBalance}
        RETURN ${resultKey}
      `,
    props: {
      accountId: request.id,
      budgetId: request.budgetId,
      updatedName: request.name,
      updatedBalance: request.balance,
    },
  }),
  deleteAccountById: (
    resultKey: string,
    budgetId: string,
    accountId: string
  ): ExecuteStatement => ({
    statement: `
        MATCH (${resultKey}:${SupportedLabel.Account} { id: $accountId, budgetId: $budgetId })
        DETACH DELETE ${resultKey}
      `,
    props: {
      accountId,
      budgetId,
    },
  }),
};
