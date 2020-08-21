import { Instance } from 'mobx-state-tree'
import { AccountStore } from '../models'
import { useRootStore } from './useRootStore'

export const useAccountStore = (): Instance<typeof AccountStore> => {
  const { accountStore } = useRootStore()
  return accountStore
}
