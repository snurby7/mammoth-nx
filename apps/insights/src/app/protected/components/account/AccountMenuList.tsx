import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AccountBalanceOutlined } from '@material-ui/icons'
import React, { ReactNode } from 'react'
import { useObservable, useRouter } from '../../../hooks'
import { RoutePaths } from '../../../routes'
import { formatter, replaceKeyPlaceholders } from '../../../utils'
import { useBudgetStore } from '../../hooks'
import { rxAccountApi } from '../../models/account'

export const AccountMenuItem = ({ accountId }: { accountId: string }) => {
  const { result: account } = useObservable(
    rxAccountApi.getAccount(accountId).details$,
    rxAccountApi.defaultAccount
  )

  // const accountStore = useAccountStore()
  const budgetStore = useBudgetStore()
  const router = useRouter()

  if (!account) {
    return null
  }

  const onAccountClick = () => {
    rxAccountApi.setViewAccount(account.id)
    router.push(
      replaceKeyPlaceholders(RoutePaths.AccountPage, {
        budgetId: budgetStore.selectedBudget?.id,
        accountId: account.id,
      })
    )
  }
  // TODO: Format the balance based on if it's negative or not.
  return (
    <ListItem alignItems="center" button onClick={onAccountClick}>
      <ListItemIcon>
        <AccountBalanceOutlined />
      </ListItemIcon>
      <ListItemText primary={account.name} />
      <ListItemText secondary={formatter.currency(account.balance)} />
    </ListItem>
  )
}

interface IAccountMenuList {
  children?: ReactNode
}

export const AccountMenuList = ({ children }: IAccountMenuList): JSX.Element => {
  const { result: accountIds } = useObservable(rxAccountApi.accountIdList$, [])
  return (
    <List dense={true}>
      {accountIds.map((accountId) => (
        <AccountMenuItem key={accountId} accountId={accountId} />
      ))}
      {children}
    </List>
  )
}
