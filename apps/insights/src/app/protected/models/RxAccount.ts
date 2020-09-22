import { IAccount } from '@mammoth/api-interfaces'
import { BehaviorSubject, Observable } from 'rxjs'
import { accountApi } from '../api'

class RxAccountApi {
  private accounts = new BehaviorSubject<IAccount[]>([])

  public get accounts$(): Observable<IAccount[]> {
    return this.accounts.asObservable()
  }

  public async loadAccounts(budgetId: string) {
    const result = await accountApi.loadAccounts(budgetId)
    this.accounts.next(result) // set all the new accounts into the array
  }

  public async loadAccount(budgetId: string, accountId: string) {
    // load the account by the budgetId and accountId
  }
}

export const rxAccountApi = new RxAccountApi()
