import { Instance } from 'mobx-state-tree'
import { BudgetStore } from '../models'
import { useRootStore } from './useRootStore'

export const useBudgetStore = (): Instance<typeof BudgetStore> => {
  const { budgetStore } = useRootStore()
  return budgetStore
}
