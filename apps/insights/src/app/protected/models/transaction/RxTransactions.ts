import { ITransaction, ITransactionDetail, ITransactionQuery } from '@mammoth/api-interfaces'
import { BehaviorSubject, Observable } from 'rxjs'
import { ITransactionGridRow } from '../../../interface'
import { toTransactionDetail, toTransactionDetails, transactionFormatter } from '../../../utils'
import { transactionApi } from '../../api'
import { Transaction } from './Transaction'

class RxTransactionApi {
  private transactions = new BehaviorSubject<Transaction[]>([])

  public get transactions$(): Observable<Transaction[]> {
    return this.transactions.asObservable()
  }

  public setTransactions(transactionDetails: ITransactionDetail[]): void {
    console.log('transaction set')
    this.transactions.next(
      transactionDetails.map((transactionDetail) => new Transaction(transactionDetail))
    )
  }

  public updateTransactions(updateRequests: Record<string, ITransactionDetail>) {
    throw new Error('Method not implemented.')
  }

  public deleteTransactions(transactionIds: string[]) {
    throw new Error('Method not implemented.')
  }

  public async searchTransactionsByQuery(
    budgetId: string,
    query?: Partial<ITransactionQuery>
  ): Promise<ITransactionDetail[]> {
    const response = await transactionApi.searchTransactions(budgetId, query)
    const transactionDetails = toTransactionDetails(response)
    this.transactions.next(transactionDetails.map((detail) => new Transaction(detail)))
    return transactionDetails
  }

  public async createTransaction(budgetId: string, gridRows: ITransactionGridRow[]) {
    const createTransactionPromises: Promise<ITransaction>[] = []
    gridRows.forEach((transactionRow) => {
      createTransactionPromises.push(
        transactionApi.createTransaction(
          budgetId,
          transactionFormatter.toCreateTransaction({ ...transactionRow, budgetId })
        )
      )
    })
    try {
      const transactionResponses: ITransaction[] = await Promise.all(createTransactionPromises)
      const transactionArray = this.transactions.value
      transactionResponses.forEach((transaction) => {
        transactionArray.push(new Transaction(toTransactionDetail(transaction)))
      })
      this.transactions.next(transactionArray)
    } catch (err) {
      console.error('Failed to create transaction', err)
    }
  }
}

export const rxTransactionApi = new RxTransactionApi()