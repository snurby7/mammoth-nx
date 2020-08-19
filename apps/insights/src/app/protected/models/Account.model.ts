import { IAccount } from '@mammoth/api-interfaces'
import { flow, getParent, Instance, SnapshotIn, types } from 'mobx-state-tree'
import { accountApi } from '../api/account.api'
import { RootModel } from '../providers'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let key: keyof IAccount
export const Account = types
  .model({
    [(key = 'id')]: types.identifier,
    [(key = 'name')]: types.string,
  })
  .actions((self) => ({}))

type AccountType = typeof Account
export interface IAccountSnap extends SnapshotIn<AccountType> {}
export interface IAccountReference {}

export const AccountStore = types
  .model({
    accounts: types.optional(types.array(Account), []),
    selectedAccount: types.safeReference(Account),
    isLoading: types.boolean,
  })
  .actions((self) => {
    const getParentInstance = (): Instance<typeof RootModel> => {
      return getParent<Instance<typeof RootModel>>(self) as Instance<typeof RootModel>
    }

    const setLoading = (loading: boolean): void => {
      self.isLoading = loading
    }

    const loadAccounts = flow(function* loadAccounts() {
      setLoading(true)
      try {
        const parent = getParentInstance()
        // TODO: This typing is borked. Need to get this better
        self.accounts = yield accountApi.loadAccounts(parent.budgetStore.selectedBudget.id)
      } catch (err) {
        console.error('Failed to load Accounts ', err)
      } finally {
        setLoading(false)
      }
    })

    const setAccount = (account: Instance<AccountType>): void => {
      self.selectedAccount = account
    }

    return {
      setLoading,
      loadAccounts,
      setAccount,
    }
  })
