import { useRootStore } from './useRootStore'

export const useBudgetStore = () => {
  const { budgetStore } = useRootStore()
  return budgetStore
}
