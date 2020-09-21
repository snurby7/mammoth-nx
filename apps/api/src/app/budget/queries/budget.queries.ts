import { IBudgetQuery, ICreateBudget, IUpdateBudget } from '@mammoth/api-interfaces'
import { v4 as uuid } from 'uuid'
import { SupportedLabel } from '../../constants'
import { ExecuteStatement } from '../../neo4j'

/**
 * Returns back a formatted query and it's statement properties to easily reuse queries
 *
 * @param {string} key This is where the result is keyed into
 * @param {ICreateBudget} request The budget request to place into the props to pass to the statement
 * @returns {ExecuteStatement}
 */
export const getCreateBudgetStatement = (
  key: string,
  request: ICreateBudget
): ExecuteStatement => ({
  query: `
    CREATE (${key}:${SupportedLabel.Budget} $nodeProps)
    RETURN ${key}
  `,
  params: {
    nodeProps: {
      ...request,
      // * override any passed in budget so I control it.
      createdDate: new Date().toISOString(),
      id: uuid(),
    },
  },
})

/**
 * Returns back the query needed to retrieve all budgets that match the given query
 * @param resultKey Key where the results will be stored.
 * @param request The request to retrieve/fill slots in the query with.
 * @returns {ExecuteStatement}
 */
export const getBudgetsByQuery = (resultKey: string, request: IBudgetQuery): ExecuteStatement => ({
  query: `
    MATCH (${resultKey}:${SupportedLabel.Budget})
    RETURN ${resultKey}
    ${request.limit ? `LIMIT ${request.limit}` : ''}
  `,
})

/**
 * Returns a query that targets only the id property on a given budget node
 *
 * @param {string} resultKey The result key
 * @param {string} id Budget Id to match
 * @returns {ExecuteStatement}
 */
export const getBudgetById = (resultKey: string, id: string): ExecuteStatement => ({
  query: `
    MATCH (${resultKey}:${SupportedLabel.Budget})
    WHERE ${resultKey}.id = $id
    RETURN ${resultKey}
  `,
  params: {
    id,
  },
})

/**
 * Deletes a given budget by it's Id and should also delete all associated nodes with it.
 *
 * Keep an eye on this as it's not ideal for deleting massive amounts of data, very inefficient.
 *
 * Doc: https://neo4j.com/docs/cypher-manual/current/clauses/delete/#delete-delete-all-nodes-and-relationships
 *
 * Improvement Opportunities
 * * Tie a budget to a user who created it and only allow that person with the ID to delete their budget
 *  * https://3.basecamp.com/4326074/buckets/14452756/todos/2447985166
 * @param {string} id A specific budgetId.
 * @returns {ExecuteStatement}
 */
export const deleteBudgetById = (id: string): ExecuteStatement => ({
  query: `
    MATCH (budget:${SupportedLabel.Budget} { id: $id })
    DETACH DELETE budget
  `,
  params: {
    id,
  },
})

/**
 * Updates a budget based on the query sent to it and returns the updated record
 *
 * Currently only updates the following
 * * name
 *
 * @param {string} resultKey Key where the result is stored
 * @param {IUpdateBudget} request The new budget data
 * @returns {ExecuteStatement}
 */
export const updateBudgetRequest = (
  resultKey: string,
  request: IUpdateBudget
): ExecuteStatement => ({
  query: `
    MATCH (${resultKey}:${SupportedLabel.Budget} { id: $id })
    SET ${resultKey}.name = $name
    RETURN ${resultKey}
  `,
  params: {
    name: request.name,
    id: request.id,
  },
})
