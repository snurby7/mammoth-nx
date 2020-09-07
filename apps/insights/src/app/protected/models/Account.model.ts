import {
  IAccount,
  ICreateAccount,
  IFormattedNode,
  SupportedAccountType,
} from '@mammoth/api-interfaces'
import { flow, getParent, getRoot, Instance, SnapshotIn, types } from 'mobx-state-tree'
import { accountApi, transactionApi } from '../api'
import { RootModel } from './Root.model'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let key: keyof IAccount
export const Account = types
  .model({
    [(key = 'id')]: types.identifier,
    [(key = 'name')]: types.string,
    [(key = 'budgetId')]: types.string,
    [(key = 'balance')]: types.number,
    [(key = 'type')]: types.enumeration<SupportedAccountType>(
      'SupportedAccountType',
      Object.values(SupportedAccountType)
    ),
  })
  .actions((self) => {
    const loadTransactions = flow(function* loadTransactions() {
      try {
        const transactions = yield transactionApi.loadTransactionsByAccount(self.budgetId, self.id)
        console.log(transactions)
        getRoot<typeof RootModel>(self).transactionStore.addTransactions(transactions)
      } catch (err) {
        console.error('Failed to load transaction', err)
      }
    })
    return {
      loadTransactions,
    }
  })
  .views((self) => ({
    get formattedNode(): IFormattedNode {
      return {
        id: self.id,
        value: self.name,
      }
    },
  }))

export type AccountType = typeof Account
export interface IAccountInstance extends Instance<AccountType> {}
export interface IAccountSnap extends SnapshotIn<AccountType> {}

export const AccountStore = types
  .model({
    accounts: types.map(Account),
    selectedAccount: types.safeReference(Account),
    isLoading: types.boolean,
  })
  .actions((self) => {
    const getParentInstance = (): Instance<typeof RootModel> => {
      return getParent<Instance<typeof RootModel>>(self)
    }

    const setLoading = (loading: boolean): void => {
      self.isLoading = loading
    }

    const loadAccounts = flow(function* loadAccounts() {
      setLoading(true)
      try {
        const parent = getParentInstance()
        // TODO: This typing is borked. Need to get this better
        const accounts: any[] = yield accountApi.loadAccounts(parent.budgetStore.selectedBudget.id)
        accounts.forEach((account) => self.accounts.put(account))
      } catch (err) {
        console.error('Failed to load Accounts ', err)
      } finally {
        setLoading(false)
      }
    })

    const createAccount = flow(function* createAccount(accountDetail: ICreateAccount) {
      setLoading(true)
      try {
        const account: any = yield accountApi.createAccount(accountDetail)
        self.accounts.put(account)
      } catch (err) {
        console.log('Create Account Error => ', err)
      } finally {
        setLoading(false)
      }
    })

    const setAccount = (account: Instance<AccountType>): void => {
      self.selectedAccount = account
    }

    return {
      createAccount,
      loadAccounts,
      setAccount,
    }
  })
