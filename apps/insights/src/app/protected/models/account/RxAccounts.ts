import { IAccount, ICreateAccount } from '@mammoth/api-interfaces'
import { Observable } from 'rxjs'
import { accountApi } from '../../api'
import { Account } from './Account'

class RxAccountApi {
  private accountMap: Map<string, Account> = new Map()

  public get accountDetailList$(): Observable<IAccount>[] {
    return Array.from(this.accountMap.values()).map((account) => account.details$)
  }

  /**
   * Load accounts and put them into a map and an
   *
   * @param {string} budgetId
   * @memberof RxAccountApi
   */
  public async loadAccounts(budgetId: string) {
    const accounts = await accountApi.loadAccounts(budgetId)

    accounts.forEach((account) => this.accountMap.set(account.id, new Account(account)))
    console.log('from inside', this)
  }

  /**
   *
   *
   * @param {string} budgetId
   * @param {string} accountId
   * @memberof RxAccountApi
   */
  public async loadAccount(budgetId: string, accountId: string) {
    // load the account by the budgetId and accountId
    const account = await accountApi.getAccount(budgetId, accountId)
    this.accountMap.get(account.id)?.updateDetails(account)
  }

  /**
   *
   *
   * @param {ICreateAccount} request
   * @memberof RxAccountApi
   */
  public async createAccount(request: ICreateAccount) {
    const account = await accountApi.createAccount(request)
    this.accountMap.set(account.id, new Account(account))
  }

  /**
   *
   *
   * @param {string} accountId
   * @returns {Observable<IAccount>}
   * @memberof RxAccountApi
   */
  public getAccount$(accountId: string): Observable<IAccount> {
    const account = this.accountMap.get(accountId)
    if (account) {
      return account.details$
    }
    throw Error(`There is not account defined by id - ${accountId}`)
  }
}

export const rxAccountApi = new RxAccountApi()
