import { INeo4jCoreNode } from '../common'
import { ExecuteStatement } from '../neo4j'

export const CommonQueries = {
  /**
   * Query will get a given node and return the matched node
   *
   * @param {string} resultKey
   * @param {INeo4jCoreNode} request
   * @returns {ExecuteStatement}
   */
  getNodeStatement: (resultKey: string, request: INeo4jCoreNode): ExecuteStatement => {
    const { id, label, budgetId } = request
    return {
      statement: `
        MATCH (${resultKey}:${label} {id: $id, budgetId: $budgetId})
        RETURN ${resultKey}
      `,
      props: {
        id,
        budgetId,
      },
    }
  },

  /**
   * Query will get a given node and return the matched node
   *
   * @param {string} resultKey
   * @param {INeo4jCoreNode} request
   * @returns {ExecuteStatement}
   */
  deleteNodeStatement: (resultKey: string, request: INeo4jCoreNode): ExecuteStatement => {
    const { id, label, budgetId } = request
    return {
      statement: `
        MATCH (${resultKey}:${label} {id: $id, budgetId: $budgetId})
        DELETE ${resultKey}
      `,
      props: {
        id,
        budgetId,
      },
    }
  },
}
