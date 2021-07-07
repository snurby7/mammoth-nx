import { ITransaction, ITransactionDetail } from '@mammoth/api-interfaces'
import { Instance, SnapshotIn, types } from 'mobx-state-tree'
import { Account, IAccountInstance } from './Account.model'
import { Category, ICategoryInstance } from './Category.model'
import { DateModel } from './Date.model'
import { IPayeeInstance, Payee } from './Payee.model'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let key: keyof ITransaction
export const Transaction = types
  .model({
    [(key = 'id')]: types.identifier,
    [(key = 'accountId')]: types.reference(Account),
    [(key = 'budgetId')]: types.string,
    [(key = 'categoryId')]: types.reference(Category),
    [(key = 'payeeId')]: types.reference(Payee),
    [(key = 'date')]: DateModel,
    [(key = 'inflow')]: types.optional(types.number, 0),
    [(key = 'outflow')]: types.optional(types.number, 0),
    [(key = 'memo')]: types.maybe(types.string),
  })
  .actions((self) => ({
    deleteTransaction() {
      // TODO: DELETE the transaction from here.
    },
  }))
  .views((self) => ({
    get formattedValue(): ITransactionDetail {
      return {
        id: self.id,
        date: {} as any,
        accountId: self.accountId.id,
        account: self.accountId.formattedNode,
        category: self.categoryId.formattedNode,
        categoryId: self.categoryId.id,
        payee: self.payeeId.formattedNode,
        payeeId: self.payeeId.id,
        budgetId: self.budgetId,
        inflow: self.inflow,
        outflow: self.outflow,
        memo: self.memo,
      }
    },
    get transactionRequest(): ITransaction {
      return {
        id: self.id,
        payeeId: self.payeeId.id,
        categoryId: self.categoryId.id,
        budgetId: self.budgetId,
        outflow: self.outflow,
        inflow: self.inflow,
        memo: self.memo,
        accountId: self.accountId.id,
        date: self.date.toDate(),
      }
    },
    get transactionDate(): Date {
      return self.date.toDateObject()
    },
  }))

export interface ITransactionInstance extends Instance<typeof Transaction> {
  accountId: IAccountInstance
  categoryId: ICategoryInstance
  payeeId: IPayeeInstance
}
export interface ITransactionSnapshot extends SnapshotIn<typeof Transaction> {}
