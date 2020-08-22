import { Instance } from 'mobx-state-tree'
import { createContext } from 'react'
import { RootModel } from '../models'

export const RootStoreContext = createContext<null | Instance<typeof RootModel>>(null)

export const InsightProvider = RootStoreContext.Provider
