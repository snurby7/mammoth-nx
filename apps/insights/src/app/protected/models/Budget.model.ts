import { IBudget } from '@mammoth/api-interfaces'
import { destroy, flow, Instance, SnapshotIn, SnapshotOrInstance, types } from 'mobx-state-tree'
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

    const createBudget = flow(function* createBudget(name: string) {
      setLoading(true)
      try {
        const budget = yield budgetApi.createBudget(name)
        self.budgets.put(budget)
      } catch (err) {
        console.log('Creating Budget Failure', err)
      } finally {
        setLoading(false)
      }
    })

    const deleteBudget = flow(function* deleteBudget(budget: IBudgetInstance) {
      setLoading(true)
      try {
        yield budgetApi.deleteBudget(budget.id)
        destroy(budget)
      } catch (err) {
        console.log('Creating Budget Failure', err)
      } finally {
        setLoading(false)
      }
    })

    const setBudget = (budget: SnapshotOrInstance<BudgetType>): void => {
      self.selectedBudget = budget
    }

    return {
      createBudget,
      deleteBudget,
      loadBudgets,
      setBudget,
    }
  })

type BudgetType = typeof Budget
export interface IBudgetInstance extends Instance<BudgetType> {}
export interface IBudgetSnap extends SnapshotIn<BudgetType> {}
export interface IBudgetReference {}
