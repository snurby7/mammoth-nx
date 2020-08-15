import { Instance, ModelSnapshotType, onSnapshot, types } from 'mobx-state-tree'
import { createContext } from 'react'
import { BudgetStore } from '../models'

export const RootModel = types.model({
  budgetStore: BudgetStore,
})

export const rootStore = RootModel.create({
  budgetStore: {
    budgets: [],
    isLoading: false,
  },
})

const states: ModelSnapshotType<{}>[] = []
let currentFrame = -1

onSnapshot(rootStore, (snapshot) => {
  if (currentFrame === states.length - 1) {
    currentFrame++
    console.log('new snapshot ----->', snapshot)
    states.push(snapshot)
  }
})

export type RootInstance = Instance<typeof RootModel>
export const RootStoreContext = createContext<null | RootInstance>(null)

export const InsightProvider = RootStoreContext.Provider
