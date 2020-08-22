import { ICategory } from '@mammoth/api-interfaces'
import { flow, getParent, Instance, SnapshotIn, types } from 'mobx-state-tree'
import { RootModel } from '.'
import { categoryApi } from '../api'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let key: keyof ICategory
export const Category = types
  .model({
    [(key = 'id')]: types.identifier,
    [(key = 'budgetId')]: types.string,
    [(key = 'name')]: types.string,
    [(key = 'parentId')]: types.maybe(types.reference(types.late(() => Category))),
  })
  .actions((self) => ({}))
  .views((self) => ({}))

export type CategoryType = typeof Category
export interface ICategoryInstance extends Instance<CategoryType> {}
export interface ICategorySnap extends SnapshotIn<CategoryType> {}

export const CategoryStore = types
  .model({
    categories: types.map(Category),
    selectedCategory: types.safeReference(Category),
    isLoading: types.boolean,
  })
  .actions((self) => {
    const getParentInstance = (): Instance<typeof RootModel> => {
      return getParent<Instance<typeof RootModel>>(self)
    }

    const setLoading = (loading: boolean): void => {
      self.isLoading = loading
    }

    const loadCategories = flow(function* loadCategories() {
      setLoading(true)
      try {
        const parent = getParentInstance()
        const categories: any[] = yield categoryApi.loadCategories(
          parent.budgetStore.selectedBudget.id
        )
        categories.forEach((category) => self.categories.put(category))
      } catch (err) {
        console.error('Failed to load Categories ', err)
      } finally {
        setLoading(false)
      }
    })

    const setCategory = (category: Instance<CategoryType>): void => {
      self.selectedCategory = category
    }

    return {
      setLoading,
      loadCategories,
      setCategory,
    }
  })
  .views((self) => ({}))
