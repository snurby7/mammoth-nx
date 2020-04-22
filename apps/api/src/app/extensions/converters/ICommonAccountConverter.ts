import { ITransaction } from '../../common'
import { IAccountLinkedNodeMeta, IAccountLinkRequest } from '../account'

export interface ICommonAccountConverter {
  convertTransactionToAccountLink: (transaction: ITransaction, transactionAmount: number) => IAccountLinkedNodeMeta
  convertToAccountLinkResponse: (
    currentTransaction: ITransaction,
    transactionUpdateRequest: ITransaction,
    linkingRelationship: string,
    currentTransactionAmount: number,
    updatedTransactionRequestAmount: number,
  ) => IAccountLinkRequest
}
