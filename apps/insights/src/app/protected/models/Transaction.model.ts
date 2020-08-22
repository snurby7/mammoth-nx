import { ITransaction } from '@mammoth/api-interfaces'
import { Instance, types } from 'mobx-state-tree'
import { ITransactionDisplayRecord } from '../interface'
import { Account } from './Account.model'
import { Category } from './Category.model'
import { Payee } from './Payee.model'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let key: keyof ITransaction
export const Transaction = types
  .model({
    [(key = 'id')]: types.identifier,
    [(key = 'accountId')]: types.reference(Account),
    [(key = 'budgetId')]: types.string,
    [(key = 'categoryId')]: types.reference(Category),
    [(key = 'payeeId')]: types.reference(Payee),
    [(key = 'date')]: types.string,
    [(key = 'inflow')]: types.optional(types.number, 0),
    [(key = 'outflow')]: types.optional(types.number, 0),
    [(key = 'memo')]: types.string,
  })
  .actions((self) => ({}))
  .views((self) => ({
    get formattedValue(): ITransactionDisplayRecord {
      return {
        id: self.id,
        date: self.date,
        accountName: self.accountId.name,
        budgetId: self.budgetId,
        payeeName: self.payeeId.name,
        categoryName: self.categoryId.name,
        inflow: self.inflow,
        outflow: self.outflow,
        memo: self.memo,
      }
    },
  }))

export interface ITransactionInstance extends Instance<typeof Transaction> {}

export const TransactionStore = types
  .model({
    transactions: types.map(Transaction),
  })
  .actions((self) => ({
    addTransactions(transactions: ITransactionInstance[]): void {
      transactions.forEach((transaction) => {
        self.transactions.put(transaction)
      })
    },
  }))
