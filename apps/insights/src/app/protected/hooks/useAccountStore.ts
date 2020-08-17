import { SnapshotOrInstance } from 'mobx-state-tree'
import { AccountStore } from '../models'
import { useRootStore } from './useRootStore'

export const useAccountStore = (): SnapshotOrInstance<typeof AccountStore> => {
  const { accountStore } = useRootStore()
  return accountStore
}
