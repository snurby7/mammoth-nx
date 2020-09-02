import { IBudget } from '@mammoth/api-interfaces'
import { flow, Instance, SnapshotIn, SnapshotOrInstance, types } from 'mobx-state-tree'
import { budgetApi } from '../api'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let key: keyof IBudget
export const Budget = types
  .model('Budget', {
    [(key = 'id')]: types.identifier,
    [(key = 'name')]: types.string,
    [(key = 'createdDate')]: types.string,
  })
  .actions((self) => ({}))

export const BudgetStore = types
  .model({
    budgets: types.map(Budget),
    selectedBudget: types.safeReference(Budget),
    isLoading: types.boolean,
  })
  .actions((self) => {
    const setLoading = (loading: boolean): void => {
      self.isLoading = loading
    }

    const loadBudgets = flow(function* loadBudgets() {
      setLoading(true)
      try {
        const budgets: any[] = yield budgetApi.loadBudgets()
        budgets.forEach((budget) => self.budgets.put(budget))
      } catch (err) {
        console.error('Failed to load budgets ', err)
      } finally {
        setLoading(false)
      }
    })

    const setBudget = (budget: SnapshotOrInstance<BudgetType>): void => {
      self.selectedBudget = budget
    }

    return {
      setLoading,
      loadBudgets,
      setBudget,
    }
  })

type BudgetType = typeof Budget
export interface IBudgetInstance extends Instance<BudgetType> {}
export interface IBudgetSnap extends SnapshotIn<BudgetType> {}
export interface IBudgetReference {}
