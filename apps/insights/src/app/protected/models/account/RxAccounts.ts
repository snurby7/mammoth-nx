import { IAccount, ICreateAccount, SupportedAccountType } from '@mammoth/api-interfaces'
import { BehaviorSubject, Observable } from 'rxjs'
import { accountApi } from '../../api'
import { Account } from './Account'

class RxAccountApi {
  private accountIdList = new BehaviorSubject<string[]>([])
  private accountMap: Map<string, Account> = new Map()
  private viewAccount: Account
  private readonly accountStorageKey = 'insights-account'

  public readonly defaultAccount: IAccount = {
    name: '',
    type: SupportedAccountType.Cash,
    balance: 0,
    budgetId: '',
    id: '',
  }

  public get accountIdList$(): Observable<string[]> {
    return this.accountIdList.asObservable()
  }

  public get viewAccountRef(): Account {
    return this.viewAccount
  }

  constructor() {
    const storedAccount: string | null = sessionStorage.getItem(this.accountStorageKey)
    if (storedAccount) {
      this.viewAccount = new Account(JSON.parse(storedAccount))
    }
  }

  /**
   * Load accounts and put them into a map and an
   *
   * @param {string} budgetId
   * @memberof RxAccountApi
   */
  public async loadAccounts(budgetId: string) {
    const accounts = await accountApi.loadAccounts(budgetId)
    const accountIds: string[] = []
    accounts.forEach((account) => {
      accountIds.push(account.id)
      this.accountMap.set(account.id, new Account(account))
    })
    this.accountIdList.next(accountIds)
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
   * @memberof RxAccountApi
   */
  public setViewAccount(accountId: string): void {
    const accountRef = this.accountMap.get(accountId)
    if (accountRef) {
      sessionStorage.setItem(this.accountStorageKey, JSON.stringify(accountRef.detailRef))
      this.viewAccount = accountRef
    }
  }

  /**
   *
   *
   * @param {string} accountId
   * @returns {Account}
   * @memberof RxAccountApi
   */
  public getAccount(accountId: string): Account {
    const account = this.accountMap.get(accountId)
    if (account) {
      return account
    }
    throw Error(`There is not account defined by id - ${accountId}`)
  }
}

export const rxAccountApi = new RxAccountApi()
