import { ITransaction, ITransactionDetail } from '@mammoth/api-interfaces'
import { flow, Instance, types } from 'mobx-state-tree'
import { transactionFormatter } from '../../utils'
import { transactionApi } from '../api'
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
    get formattedValue(): ITransactionDetail {
      return {
        id: self.id,
        date: self.date,
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
        date: self.date,
      }
    },
  }))

export interface ITransactionInstance extends Instance<typeof Transaction> {}

export const TransactionStore = types
  .model({
    transactions: types.map(Transaction),
    isLoading: types.optional(types.boolean, false),
  })
  .actions((self) => {
    const setLoading = (loading: boolean): void => {
      self.isLoading = loading
    }

    const addTransactions = (transactions: ITransactionInstance[]): void => {
      transactions.forEach((transaction) => {
        self.transactions.put(transaction)
      })
    }
    const createTransactions = (transactionDetails: ITransactionDetail[]): void => {
      // use the create method on the TransactionApi
    }
    const deleteTransactions = (transactionIdentifiers: string[]): void => {
      // use the delete method on the TransactionApi
    }

    const updateTransactions = flow(function* updateTransactions(
      transactionDetails: Record<string, ITransactionDetail>
    ) {
      setLoading(true)
      const promises: Promise<ITransaction>[] = []
      console.log(Object.keys(transactionDetails))
      Object.keys(transactionDetails).forEach((transactionId) => {
        const existingTransaction = self.transactions.get(transactionId)
        if (existingTransaction) {
          const payload: ITransaction = {
            ...existingTransaction.transactionRequest,
            ...transactionFormatter.toTransaction(transactionDetails[transactionId]),
          }
          promises.push(transactionApi.updateTransaction(existingTransaction.budgetId, payload))
        } else {
          console.log('Transaction does not exist')
        }
      })
      // use the update method on the TransactionApi
      try {
        const transactions: any[] = yield Promise.all(promises)
        transactions.forEach((transaction) => {
          self.transactions.put(transaction)
        })
      } catch (err) {
        console.error('Failed to update transaction', err)
      } finally {
        setLoading(false)
      }
    })

    return {
      addTransactions,
      createTransactions,
      deleteTransactions,
      updateTransactions,
    }
  })
