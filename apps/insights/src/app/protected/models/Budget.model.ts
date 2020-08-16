import { IBudget } from '@mammoth/api-interfaces'
import { flow, SnapshotIn, types } from 'mobx-state-tree'
import { budgetApi } from '../api'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let key: keyof IBudget
export const Budget = types
  .model({
    [(key = 'id')]: types.identifier,
    [(key = 'name')]: types.string,
    [(key = 'createdDate')]: types.string,
  })
  .actions((self) => ({}))

type BudgetType = typeof Budget
export interface IBudgetSnap extends SnapshotIn<BudgetType> {}
export interface IBudgetReference {}

export const BudgetStore = types
  .model({
    budgets: types.optional(types.array(Budget), []),
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
        self.budgets = yield budgetApi.loadBudgets()
      } catch (err) {
        console.error('Failed to load budgets ', err)
      } finally {
        setLoading(false)
      }
    })

    const setBudget = (budget: IBudgetSnap): void => {
      self.selectedBudget = budget
    }

    return {
      setLoading,
      loadBudgets,
      setBudget,
    }
  })
