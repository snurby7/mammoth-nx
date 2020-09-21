import { IAccount, IAccountQuery, ICreateAccount } from '@mammoth/api-interfaces'
import { v4 as uuid } from 'uuid'
import { NodeRelationship, SupportedLabel } from '../../constants'
import { ExecuteStatement } from '../../neo4j'

/**
 * Account queries for handling the cypher queries.
 */
export const accountQueries = {
  createAccount: (resultKey: string, request: ICreateAccount): ExecuteStatement => ({
    query: `
        MATCH (budget:${SupportedLabel.Budget} {id: $budgetId})
        CREATE (${resultKey}:${SupportedLabel.Account} $nodeProps)
        MERGE (${resultKey})-[r:${NodeRelationship.AccountOf}]->(budget)
        RETURN ${resultKey}
      `,
    params: {
      budgetId: request.budgetId,
      nodeProps: {
        ...request,
        createdDate: new Date().toISOString(),
        id: uuid(),
      },
    },
  }),

  findAccounts: (resultKey: string, request: IAccountQuery): ExecuteStatement => ({
    query: `
        MATCH (${resultKey}:${SupportedLabel.Account} {budgetId: $budgetId})
        RETURN ${resultKey}
        ${request.limit ? `LIMIT ${request.limit}` : ''}
      `,
    params: {
      budgetId: request.budgetId,
    },
  }),
  getAccountById: (resultKey: string, budgetId: string, accountId: string): ExecuteStatement => ({
    query: `
        MATCH (${resultKey}:${SupportedLabel.Account} {id: $accountId, budgetId: $budgetId})
        RETURN ${resultKey}
      `,
    params: {
      accountId,
      budgetId,
    },
  }),
  updateExistingAccount: (resultKey: string, request: IAccount): ExecuteStatement => ({
    query: `
        MATCH (${resultKey}:${SupportedLabel.Account} {id: $accountId, budgetId: $budgetId})
        SET ${resultKey} += {name: $updatedName, balance: $updatedBalance}
        RETURN ${resultKey}
      `,
    params: {
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
    query: `
        MATCH (${resultKey}:${SupportedLabel.Account} { id: $accountId, budgetId: $budgetId })
        DETACH DELETE ${resultKey}
      `,
    params: {
      accountId,
      budgetId,
    },
  }),
}
