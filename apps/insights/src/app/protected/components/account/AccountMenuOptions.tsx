import { ICreateAccount } from '@mammoth/api-interfaces'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AddOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { useAccountStore } from '../../hooks'
import { AccountMenuList } from './AccountMenuList'
import { AddAccountDialog } from './AddAccountDialog'

export const AccountMenuOptions = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const store = useAccountStore()

  const onAddClick = () => {
    setIsOpen(true)
  }

  const onAddDialogClose = (accountDetails: ICreateAccount | null) => {
    if (accountDetails) {
      console.log('Going to save this account', accountDetails)
    }
    setIsOpen(false)
  }

  return (
    <AccountMenuList accounts={store.accounts}>
      <ListItem alignItems="center" button onClick={onAddClick}>
        <ListItemIcon>
          <AddOutlined />
        </ListItemIcon>
        <ListItemText primary="Add Account" />
      </ListItem>
      <AddAccountDialog isOpen={isOpen} onClose={onAddDialogClose} />
    </AccountMenuList>
  )
}
