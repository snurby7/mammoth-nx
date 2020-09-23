import { ITransaction, ITransactionDetail } from '@mammoth/api-interfaces'
import { BehaviorSubject, Observable } from 'rxjs'
import { ITransactionGridRow } from '../../../interface'
import { transactionFormatter } from '../../../utils'
import { transactionApi } from '../../api'
import { Transaction } from './Transaction'

class RxTransactionApi {
  private transactions = new BehaviorSubject<Transaction[]>([])

  public get transactions$(): Observable<Transaction[]> {
    return this.transactions.asObservable()
  }

  public setTransactions(transactionDetails: ITransaction[]): void {
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
        transactionArray.push(new Transaction(transaction))
      })
      this.transactions.next(transactionArray)
    } catch (err) {
      console.error('Failed to create transaction', err)
    }
  }
}

export const rxTransactionApi = new RxTransactionApi()
