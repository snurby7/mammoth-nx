import { Instance } from 'mobx-state-tree'
import { useContext } from 'react'
import { RootModel, RootStoreContext } from '../providers'

export const useRootStore = (): Instance<typeof RootModel> => {
  const rootStore = useContext(RootStoreContext)
  if (!rootStore) {
    throw new Error('RootStore is null, this is jacked')
  }
  return rootStore as Instance<typeof RootModel>
}
