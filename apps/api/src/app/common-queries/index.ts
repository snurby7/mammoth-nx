import { ExecuteStatement, IMammothCoreNode } from '../neo4j'

export const CommonQueries = {
  /**
   * Query will get a given node and return the matched node
   *
   * @param {string} resultKey
   * @param {IMammothCoreNode} request
   * @returns {ExecuteStatement}
   */
  getNodeStatement: (resultKey: string, request: IMammothCoreNode): ExecuteStatement => {
    const { id, label, budgetId } = request
    return {
      query: `
        MATCH (${resultKey}:${label} {id: $id, budgetId: $budgetId})
        RETURN ${resultKey}
      `,
      params: {
        id,
        budgetId,
      },
    }
  },

  /**
   * Query will get a given node and return the matched node
   *
   * @param {string} resultKey
   * @param {IMammothCoreNode} request
   * @returns {ExecuteStatement}
   */
  deleteNodeStatement: (resultKey: string, request: IMammothCoreNode): ExecuteStatement => {
    const { id, label, budgetId } = request
    return {
      query: `
        MATCH (${resultKey}:${label} {id: $id, budgetId: $budgetId})
        DELETE ${resultKey}
      `,
      params: {
        id,
        budgetId,
      },
    }
  },
}
