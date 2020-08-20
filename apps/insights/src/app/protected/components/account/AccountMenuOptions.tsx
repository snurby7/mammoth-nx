import React, { useEffect } from 'react'
import { useAccountStore } from '../../hooks'
import { AccountMenuList } from './AccountMenuList'

export const AccountMenuOptions = (): JSX.Element => {
  const store = useAccountStore()
  useEffect(() => {
    store.loadAccounts()
  }, [store])
  console.log(store.selectedAccount)
  return <AccountMenuList accounts={store.accounts} />
}
