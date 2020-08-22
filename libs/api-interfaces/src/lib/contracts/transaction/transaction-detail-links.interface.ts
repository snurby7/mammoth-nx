import { IFormattedNode } from '../generic'

export interface ITransactionDetailLinks {
  account: IFormattedNode
  accountId: string
  category: IFormattedNode
  categoryId: string
  payee: IFormattedNode
  payeeId: string
}
