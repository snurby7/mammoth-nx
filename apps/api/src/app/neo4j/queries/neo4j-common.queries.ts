import { ExecuteStatement, IMammothCoreNode } from '../interface'

export const Neo4jCommonQueries = {
  createRelationship: (
    resultKey: string,
    fromNodeProps: IMammothCoreNode,
    relationship: string,
    toNodeProps: IMammothCoreNode,
  ): ExecuteStatement => {
    if (fromNodeProps.budgetId !== toNodeProps.budgetId) throw Error('Budget Ids do not match')
    return {
      statement: `
        MATCH (fromNode:${fromNodeProps.label} {id: $fromNodeId })
        MATCH (toNode:${toNodeProps.label} {id: $toNodeId })
        CREATE (fromNode)-[${resultKey}:${relationship}]->(toNode)
        RETURN ${resultKey}
      `,
      props: {
        fromNodeId: fromNodeProps.id,
        toNodeId: toNodeProps.id,
      },
    }
  },
}
