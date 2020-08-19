import { Button } from '@mammoth/insights-ui'
import React from 'react'

export const ViewAllAccounts = (): JSX.Element => {
  const onClick = () => {
    alert('Nothing here yet')
    // route to an all accounts page where you can see all transactions
  }
  return <Button onClick={onClick}>View All Accounts</Button>
}
