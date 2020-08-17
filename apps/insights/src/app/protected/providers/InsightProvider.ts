import { Instance, ModelSnapshotType, onSnapshot, types } from 'mobx-state-tree'
import { createContext } from 'react'
import { AccountStore, BudgetStore } from '../models'

export const RootModel = types.model({
  budgetStore: BudgetStore,
  accountStore: AccountStore,
})

export const rootStore = RootModel.create({
  budgetStore: {
    budgets: [],
    isLoading: false,
  },
  accountStore: {
    accounts: [],
    isLoading: false,
  },
})

const states: ModelSnapshotType<{}>[] = []
let currentFrame = -1

onSnapshot(rootStore, (snapshot: any) => {
  if (currentFrame === states.length - 1) {
    currentFrame++
    console.log('new snapshot ----->', snapshot)
    states.push(snapshot)
  }
})

export const RootStoreContext = createContext<null | Instance<typeof RootModel>>(null)

export const InsightProvider = RootStoreContext.Provider
