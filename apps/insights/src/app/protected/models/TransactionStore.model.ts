import {
  IDateRangeSearchQuery,
  IDeleteResponse,
  ITransaction,
  ITransactionDetail,
  ITransactionQuery,
} from '@mammoth/api-interfaces'
import { flow, types } from 'mobx-state-tree'
import { ITransactionGridRow } from '../../interface'
import { transactionFormatter } from '../../utils'
import { transactionApi, transactionSearchApi } from '../api'
import { ITransactionInstance, Transaction } from './Transaction.model'

export const TransactionStore = types
  .model({
    transactions: types.map(Transaction),
    isLoading: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get pastMonthTransaction(): ITransactionInstance[] {
      const date = new Date()
      return Array.from(self.transactions.values())
        .filter((transaction) => {
          const isInMonthRange = transaction.date.month === date.getMonth() + 1
          const isPastTransaction = transaction.date.day <= date.getDate()
          const isInCurrentYear = transaction.date.year === date.getFullYear()
          if (isInMonthRange && isPastTransaction && isInCurrentYear) {
            return transaction
          }
          return undefined
        })
        .filter((transaction) => transaction)
    },
  }))
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

    const searchTransactionDateRange = flow(function* searchTransactionDateRange(
      budgetId: string,
      dateRangeSearchQuery: IDateRangeSearchQuery
    ) {
      try {
        const transactions: any[] = yield transactionSearchApi.searchTransactions(
          budgetId,
          dateRangeSearchQuery
        )
        transactions.forEach((transaction) => self.transactions.put(transaction))
      } catch (err) {
        console.log('Transaction search query failure -> ', err)
      }
    })

    const searchTransactionsByQuery = flow(function* searchTransactionsByQuery(
      budgetId: string,
      query?: Partial<ITransactionQuery>
    ) {
      try {
        const transactions: any[] = yield transactionApi.searchTransactions(budgetId, query)
        transactions.forEach((transaction) => self.transactions.put(transaction))
      } catch (err) {
        console.log('Transaction search query failed -> ', err)
      }
    })

    return {
      addTransactions,
      createTransactions,
      deleteTransactions,
      searchTransactionDateRange,
      searchTransactionsByQuery,
      updateTransactions,
    }
  })
