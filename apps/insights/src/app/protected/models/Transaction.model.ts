import { IDeleteResponse, ITransaction, ITransactionDetail } from '@mammoth/api-interfaces'
import { flow, Instance, types } from 'mobx-state-tree'
import { ITransactionGridRow } from '../../interface'
import { transactionFormatter } from '../../utils'
import { transactionApi } from '../api'
import { Account } from './Account.model'
import { Category } from './Category.model'
import { DateModel } from './Date.model'
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
    [(key = 'date')]: DateModel,
    [(key = 'inflow')]: types.optional(types.number, 0),
    [(key = 'outflow')]: types.optional(types.number, 0),
    [(key = 'memo')]: types.string,
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
        date: self.date.toDate(),
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
    const createTransactions = flow(function* (
      budgetId: string,
      transactionRows: ITransactionGridRow[]
    ) {
      // use the create method on the TransactionApi
      setLoading(true)
      const createTransactionPromises: Promise<ITransaction>[] = []
      transactionRows.forEach((transactionRow) => {
        createTransactionPromises.push(
          transactionApi.createTransaction(
            budgetId,
            transactionFormatter.toCreateTransaction({ ...transactionRow, budgetId })
          )
        )
      })
      // TODO: Figure out a way to correctly type these generators
      try {
        const transactions: any[] = yield Promise.all(createTransactionPromises)
        transactions.forEach((transaction) => {
          self.transactions.put(transaction)
        })
      } catch (err) {
        console.error('Failed to update transaction', err)
      } finally {
        setLoading(false)
      }
    })

    const deleteTransactions = flow(function* (transactionIds: string[]) {
      setLoading(true)
      const deleteTransactions: Promise<IDeleteResponse>[] = []
      transactionIds.forEach((id) => {
        deleteTransactions.push(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          transactionApi.deleteTransaction(self.transactions.get(id)!.budgetId, id)
        )
      })
      // TODO: Figure out a way to correctly type these generators
      try {
        // TODO: Make this notify a ToastStore
        yield Promise.all(deleteTransactions)
        transactionIds.forEach((id) => self.transactions.delete(id))
      } catch (err) {
        console.error('Failed to update transaction', err)
      } finally {
        setLoading(false)
      }
      // use the delete method on the TransactionApi
      // TODO: Get the transaction by the identifier and call the delete method on the instance
    })

    const updateTransactions = flow(function* updateTransactions(
      transactionDetails: Record<string, ITransactionDetail>
    ) {
      setLoading(true)
      const promises: Promise<ITransaction>[] = []
      Object.keys(transactionDetails).forEach((transactionId) => {
        const existingTransaction = self.transactions.get(transactionId)
        if (existingTransaction) {
          const payload: ITransaction = {
            ...existingTransaction.transactionRequest,
            ...transactionFormatter.toPartialTransaction(transactionDetails[transactionId]),
          }
          promises.push(transactionApi.updateTransaction(existingTransaction.budgetId, payload))
        } else {
          console.log('Transaction does not exist')
        }
      })
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
