import { ICreateCategory } from '@mammoth/api-interfaces'
import { v4 as uuid } from 'uuid'
import { NodeRelationship, SupportedLabel } from '../../constants'
import { ExecuteStatement } from '../../neo4j'

export const categoryQueries = {
  createChildCategory: (resultKey: string, request: ICreateCategory): ExecuteStatement => ({
    query: `
      MATCH (parentCategory:${SupportedLabel.Category} {id: $parentId, budgetId: $budgetId})
      CREATE (${resultKey}:${SupportedLabel.Category} $nodeProps)
      MERGE (${resultKey})-[r:${NodeRelationship.CategoryOf}]->(parentCategory)
      RETURN ${resultKey}
    `,
    params: {
      budgetId: request.budgetId,
      parentId: request.parentId,
      nodeProps: { ...request, id: uuid() },
    },
  }),
  createCategory: (resultKey: string, request: ICreateCategory): ExecuteStatement => ({
    query: `
      MATCH (budget:${SupportedLabel.Budget} {id: $budgetId})
      CREATE (${resultKey}:${SupportedLabel.Category} $nodeProps)
      MERGE (${resultKey})-[r:${NodeRelationship.CategoryOf}]->(budget)
      RETURN ${resultKey}
    `,
    params: {
      nodeProps: { ...request, id: uuid() },
      budgetId: request.budgetId,
    },
  }),
  getAllCategoriesByBudget: (budgetId: string): ExecuteStatement => ({
    query: `
      MATCH (parent:${SupportedLabel.Category} {budgetId: $budgetId})
      OPTIONAL MATCH (parent)<-[:${NodeRelationship.CategoryOf}]-(child)
      RETURN {
        parentNode: parent,
        children: {details :collect(child)}
      }
    `,
    params: {
      budgetId,
    },
  }),
  getCategoryWithChildrenById: (categoryId: string, budgetId: string): ExecuteStatement => ({
    query: `
      MATCH (parentCategory:Category {id: $id, budgetId: $budgetId})
      OPTIONAL MATCH (parentCategory)<-[:${NodeRelationship.CategoryOf}]-(childCategory})
      WITH COLLECT (childCategory}) + parentCategory AS all
      UNWIND all as parentCategory
      MATCH (parentCategory)
      OPTIONAL MATCH (parentCategory)<-[:${NodeRelationship.CategoryOf}]-(childCategory})
      RETURN {
        parentNode: parentCategory,
        children : {details :collect(childCategory})}
      }
    `,
    params: {
      id: categoryId,
      budgetId,
    },
  }),
  deleteCategory: (categoryId: string, budgetId: string): ExecuteStatement => ({
    query: `
        MATCH (node:${SupportedLabel.Category} { id: $categoryId, budgetId: $budgeId })
        DETACH DELETE node
      `,
    params: {
      budgetId,
      categoryId,
    },
  }),
  getCategoryNode: (resultKey: string, categoryId: string, budgetId: string): ExecuteStatement => ({
    query: `
        MATCH (${resultKey}:${SupportedLabel.Category} {id: $categoryId, budgetId: $budgetId})
        RETURN ${resultKey}
      `,
    params: {
      categoryId,
      budgetId,
    },
  }),
}
