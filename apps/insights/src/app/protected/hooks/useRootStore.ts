import { useContext } from 'react'
import { RootStoreContext } from '../providers'

export const useRootStore = () => {
  const rootStore = useContext(RootStoreContext)
  if (!rootStore) {
    throw new Error('RootStore is null, this is jacked')
  }
  return rootStore
}
