import { ITransaction } from '../../common';

export interface ITransactionLinkRequest {
  currentTransaction: ITransaction;
  updatedTransactionRequest: ITransaction;
  linkingRelationship: string;
  nodeLabel: string;
  linkingLabel: string;
  budgetId: string;
  propKey: keyof ITransaction;
}
