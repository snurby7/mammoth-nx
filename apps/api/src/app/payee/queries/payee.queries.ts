import { ICreatePayee } from '@mammoth/api-interfaces'
import { v4 as uuid } from 'uuid'
import { NodeRelationship, SupportedLabel } from '../../constants'
import { ExecuteStatement } from '../../neo4j'

export const payeeQueries = {
  createPayee: (resultKey: string, request: ICreatePayee): ExecuteStatement => ({
    statement: `
        MATCH (budget:Budget {id: $budgetId})
        CREATE (${resultKey}:${SupportedLabel.Payee} $nodeProps)
        MERGE (${resultKey})-[r:${NodeRelationship.PayeeOf}]->(budget)
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
  getAllPayeesByBudgetId: (resultKey: string, budgetId: string): ExecuteStatement => ({
    statement: `
        MATCH (${resultKey}:${SupportedLabel.Payee} { budgetId: $budgetId })
        RETURN ${resultKey}
      `,
    props: {
      budgetId,
    },
  }),
}
