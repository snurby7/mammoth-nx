import { ITransactionDetail } from '@mammoth/api-interfaces'
import { BehaviorSubject, Observable } from 'rxjs'

class RxTransactionApi {
  private transactions = new BehaviorSubject<ITransactionDetail[]>([])

  public get transactions$(): Observable<ITransactionDetail[]> {
    return this.transactions.asObservable()
  }

  public setTransactions(transactions: ITransactionDetail[]): void {
    this.transactions.next(transactions)
  }
}

export const rxTransactionApi = new RxTransactionApi()
