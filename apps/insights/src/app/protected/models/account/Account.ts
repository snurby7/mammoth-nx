import { IAccount, IFormattedNode } from '@mammoth/api-interfaces'
import { BehaviorSubject, Observable } from 'rxjs'
import { transactionApi } from '../../api'
import { rxTransactionApi } from '../transaction'

export class Account {
  private detailsSubject = new BehaviorSubject(this.details)

  constructor(private details: IAccount) {}

  public get details$(): Observable<IAccount> {
    return this.detailsSubject.asObservable()
  }

  public get formattedNode(): IFormattedNode {
    return { id: this.details.id, value: this.details.name }
  }

  public get detailRef(): IAccount {
    return this.detailsSubject.value
  }

  public toFormattedNode(): IFormattedNode {
    return {
      id: this.details.id,
      value: this.details.name,
    }
  }

  public async getTransactionsByAccount() {
    const transactions = await transactionApi.loadTransactionsByAccount(
      this.details.budgetId,
      this.details.id
    )
    rxTransactionApi.setTransactions(transactions)
  }

  public updateDetails(details: IAccount): void {
    this.detailsSubject.next(details)
  }
}
