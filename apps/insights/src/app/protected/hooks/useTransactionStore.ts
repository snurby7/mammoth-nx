import { Instance } from 'mobx-state-tree'
import { TransactionStore } from '../models'
import { useRootStore } from './useRootStore'

export const useTransactionStore = (): Instance<typeof TransactionStore> => {
  const { transactionStore } = useRootStore()
  return transactionStore
}
