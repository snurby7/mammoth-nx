import { Instance } from 'mobx-state-tree'
import { PayeeStore } from '../models'
import { useRootStore } from './useRootStore'

export const usePayeeStore = (): Instance<typeof PayeeStore> => {
  const { payeeStore } = useRootStore()
  return payeeStore
}
