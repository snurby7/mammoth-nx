import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AddOutlined } from '@material-ui/icons'
import React from 'react'
import { useAccountStore } from '../../hooks'
import { AccountMenuList } from './AccountMenuList'

export const AccountMenuOptions = (): JSX.Element => {
  const store = useAccountStore()

  const onAddAccountClick = () => {
    alert('Coming soon')
  }

  return (
    <AccountMenuList accounts={store.accounts}>
      <ListItem alignItems="center" button onClick={onAddAccountClick}>
        <ListItemIcon>
          <AddOutlined />
        </ListItemIcon>
        <ListItemText primary="Add Account" />
      </ListItem>
    </AccountMenuList>
  )
}
