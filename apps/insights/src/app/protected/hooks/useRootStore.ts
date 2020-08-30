import { useContext } from 'react'
import { IRootModelInstance } from '../models'
import { RootStoreContext } from '../providers'

export const useRootStore = (): IRootModelInstance => {
  const rootStore = useContext(RootStoreContext)
  if (!rootStore) {
    throw new Error('RootStore is null, this is jacked')
  }
  return rootStore
}
