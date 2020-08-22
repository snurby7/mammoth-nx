import { Instance } from 'mobx-state-tree'
import { CategoryStore } from '../models'
import { useRootStore } from './useRootStore'

export const useCategoryStore = (): Instance<typeof CategoryStore> => {
  const { categoryStore } = useRootStore()
  return categoryStore
}
