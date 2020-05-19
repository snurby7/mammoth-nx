import { ICreateAccount } from '@mammoth/api-interfaces';
import * as uuid from 'uuid/v4';
import { NodeRelationship, SupportedLabel } from '../../constants';

/**
 * Account queries for handling the cypher queries.
 */
export const accountQueries = {
  createAccount: (resultKey: string, request: ICreateAccount) => ({
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
};
