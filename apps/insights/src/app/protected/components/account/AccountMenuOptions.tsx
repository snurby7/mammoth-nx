import React from 'react'
import { useAccountStore } from '../../hooks'
import { AccountMenuList } from './AccountMenuList'

export const AccountMenuOptions = (): JSX.Element => {
  const store = useAccountStore()
  return <AccountMenuList accounts={store.accounts} />
}
