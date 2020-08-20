import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { ListOutlined } from '@material-ui/icons'
import React from 'react'
export const ViewAllAccounts = (): JSX.Element => {
  const onClick = () => {
    alert('Nothing here yet')
    // route to an all accounts page where you can see all transactions
  }
  return (
    <ListItem button key={'View All Accounts'} onClick={onClick}>
      <ListItemIcon>
        <ListOutlined />
      </ListItemIcon>
      <ListItemText primary="View All Accounts" />
    </ListItem>
  )
}
