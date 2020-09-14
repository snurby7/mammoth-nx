import { Typography } from '@material-ui/core'
import React from 'react'
import { FutureTransactionTableView } from '../components'

export const UpcomingExpenseView = (): JSX.Element => {
  return (
    <section>
      <Typography variant="h4">Upcoming Expenses</Typography>
      <FutureTransactionTableView />
    </section>
  )
}
