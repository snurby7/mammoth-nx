import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { ListOutlined } from '@material-ui/icons'
import React, { useCallback } from 'react'
import { useRouter } from '../../../hooks'
import { RoutePaths } from '../../../routes'
import { replaceKeyPlaceholders } from '../../../utils'
import { useBudgetStore } from '../../hooks'
export const ViewAllAccounts = (): JSX.Element => {
  const router = useRouter()
  const { selectedBudget } = useBudgetStore()

  const onClick = useCallback(() => {
    router.push(
      replaceKeyPlaceholders(RoutePaths.TransactionsPage, { budgetId: selectedBudget?.id })
    )
  }, [router, selectedBudget?.id])

  return (
    <ListItem button key={'View All Accounts'} onClick={onClick}>
      <ListItemIcon>
        <ListOutlined />
      </ListItemIcon>
      <ListItemText primary="View All Accounts" />
    </ListItem>
  )
}
