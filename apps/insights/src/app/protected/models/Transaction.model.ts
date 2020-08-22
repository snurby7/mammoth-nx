import { ITransaction } from '@mammoth/api-interfaces'
import { Instance, types } from 'mobx-state-tree'
import { Account } from './Account.model'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let key: keyof ITransaction
export const Transaction = types
  .model({
    [(key = 'id')]: types.identifier,
    [(key = 'accountId')]: types.reference(Account),
    [(key = 'budgetId')]: types.string,
    // [(key = 'categoryId')]: types.string, // TODO this is a category
    // [(key = 'payeeId')]: types.string, // TODO this is a payee
    [(key = 'date')]: types.string,
    [(key = 'inflow')]: types.optional(types.number, 0),
    [(key = 'outflow')]: types.optional(types.number, 0),
    [(key = 'memo')]: types.string,
  })
  .actions((self) => ({}))
  .views((self) => ({
    get formattedValue(): Record<string, any> {
      return {
        id: self.id,
        date: self.date,
        accountName: self.accountId.name,
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
