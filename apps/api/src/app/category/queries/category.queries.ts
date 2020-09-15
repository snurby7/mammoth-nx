import { ICreateCategory } from '@mammoth/api-interfaces'
import { v4 as uuid } from 'uuid'
import { NodeRelationship, SupportedLabel } from '../../constants'
import { ExecuteStatement } from '../../neo4j'

export const categoryQueries = {
  createChildCategory: (resultKey: string, request: ICreateCategory): ExecuteStatement => ({
    statement: `
      MATCH (parentCategory:${SupportedLabel.Category} {id: $parentId, budgetId: $budgetId})
      CREATE (${resultKey}:${SupportedLabel.Category} $nodeProps)
      MERGE (${resultKey})-[r:${NodeRelationship.CategoryOf}]->(parentCategory)
      RETURN ${resultKey}
    `,
    props: {
      budgetId: request.budgetId,
      parentId: request.parentId,
      nodeProps: { ...request, id: uuid() },
    },
  }),
  createCategory: (resultKey: string, request: ICreateCategory): ExecuteStatement => ({
    statement: `
      MATCH (budget:${SupportedLabel.Budget} {id: $budgetId})
      CREATE (${resultKey}:${SupportedLabel.Category} $nodeProps)
      MERGE (${resultKey})-[r:${NodeRelationship.CategoryOf}]->(budget)
      RETURN ${resultKey}
    `,
    props: {
      nodeProps: { ...request, id: uuid() },
      budgetId: request.budgetId,
    },
  }),
  getAllCategoriesByBudget: (budgetId: string): ExecuteStatement => ({
    statement: `
      MATCH (parent:${SupportedLabel.Category} {budgetId: $budgetId})
      OPTIONAL MATCH (parent)<-[:${NodeRelationship.CategoryOf}]-(child)
      RETURN {
        parentNode: parent,
        children: {details :collect(child)}
      }
    `,
    props: {
      budgetId,
    },
  }),
}
