import { ICreateTransaction, ITransaction, ITransactionQuery } from '@mammoth/api-interfaces'
import { v4 as uuid } from 'uuid'
import { CommonQueries } from '../../common-queries'
import { NodeRelationship, SupportedLabel } from '../../constants'
import { ExecuteStatement } from '../../neo4j'

/**
 * This exports out all the possible TransactionQueries.
 */
export const TransactionQueries = {
  /**
   * Query will give you back all that is needed in order to execute a transaction being added and linking it to the
   * account, payee, and category
   *
   * @param {string} requestKey
   * @param {ICreateTransaction} request
   * @returns {ExecuteStatement}
   */
  createNewTransaction: (requestKey: string, request: ICreateTransaction): ExecuteStatement => ({
    statement: `
      MATCH (category:Category {id: $categoryId, budgetId: $budgetId})
      MATCH (account:Account {id: $accountId, budgetId: $budgetId})
      MATCH (payee:Payee {id: $payeeId, budgetId: $budgetId})
      CREATE (${requestKey}:${SupportedLabel.Transaction} $nodeProps)
      SET ${requestKey}.createdDate = datetime("${new Date().toISOString()}")
      SET ${requestKey}.date = datetime("${request.date}")
      MERGE (${requestKey})-[relatesToAccount:${NodeRelationship.UsedAccount}]->(account)
      MERGE (${requestKey})-[relatesToCategory:${NodeRelationship.UsedCategory}]->(category)
      MERGE (${requestKey})-[relatesToPayee:${NodeRelationship.UsedPayee}]->(payee)
      RETURN ${requestKey}
    `,
    props: {
      budgetId: request.budgetId,
      categoryId: request.categoryId,
      accountId: request.accountId,
      payeeId: request.payeeId,
      nodeProps: {
        ...request,
        createdDate: new Date().toISOString(),
        id: uuid(),
      },
    },
  }),

  /**
   * Deletes a transaction by a given Id. If there are currently links from the transaction the statement
   * will throw and you will first need to remove all the existing links. This doesn't just drop it out of the map, since
   * that is no a desirable effect to all of a sudden strand nodes.
   *
   * @param {string} transactionId Transaction Id to be remove
   * @param {string} budgetId Budget Id to remove the node from
   * @returns {ExecuteStatement}
   */
  deleteTransactionStatement: (transactionId: string, budgetId: string): ExecuteStatement =>
    CommonQueries.deleteNodeStatement('deletedNode', {
      id: transactionId,
      budgetId,
      label: SupportedLabel.Transaction,
    }),

  /**
   * Returns back a statement and its properties given a search request.
   *
   * @param {string} resultKey Key where the results are placed
   * @param {ITransactionQuery} query Query properties to find a transaction
   * @returns {ExecuteStatement}
   */
  searchTransactions: (resultKey: string, query: ITransactionQuery): ExecuteStatement => {
    const { budgetId, categoryId, payeeId, accountId, id } = query
    return {
      statement: `
      MATCH (${resultKey}:${SupportedLabel.Transaction} {budgetId: $budgetId})
      WHERE ${resultKey}.categoryId = $categoryId
        OR ${resultKey}.id = $id
        OR ${resultKey}.payeeId = $payeeId
        OR ${resultKey}.accountId = $accountId
        OR ${resultKey}.budgetId = $budgetId
      RETURN ${resultKey}
    `,
      props: {
        id: id || '',
        budgetId: budgetId || '',
        categoryId: categoryId || '',
        payeeId: payeeId || '',
        accountId: accountId || '',
      },
    }
  },

  /**
   * Function to give you back a statement and properties for updating a given transaction
   *
   * @param {string} resultKey
   * @param {ITransaction} request
   * @returns {ExecuteStatement}
   */
  updateTransaction: (resultKey: string, request: ITransaction): ExecuteStatement => ({
    statement: `
    MATCH (${resultKey}:${SupportedLabel.Transaction} { id: $id})
    SET ${resultKey} += {inflow: $inflow, outflow: $outflow, memo: $memo, date: datetime($date), accountId: $accountId, payeeId: $payeeId, categoryId: $categoryId}
    RETURN ${resultKey}
  `,
    props: {
      memo: request.memo || nullE,
      inflow: request.inflow || null,
      outflow: request.outflow || null,
      date: request.date,
      id: request.id,
      accountId: request.accountId,
      categoryId: request.categoryId,
      payeeId: request.payeeId,
    },
  }),

  /**
   * Match a single transaction and return that transaction
   *
   * @param {string} resultKey Where the value is stored in the record
   * @param {string} transactionId Id of the transaction to retrieve
   * @param {string} budgetId BudgetId the transaction is under
   * @returns {ExecuteStatement}
   */
  getTransaction: (resultKey: string, transactionId: string, budgetId: string): ExecuteStatement =>
    CommonQueries.getNodeStatement(resultKey, {
      id: transactionId,
      budgetId,
      label: SupportedLabel.Transaction,
    }),
}
