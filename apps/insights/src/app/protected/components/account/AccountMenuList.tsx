import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AccountBalanceOutlined } from '@material-ui/icons'
import { observer } from 'mobx-react'
import React from 'react'
import { useRouter } from '../../../hooks'
import { RoutePaths } from '../../../routes'
import { formatter, replaceKeyPlaceholders } from '../../../utils'
import { useAccountStore, useBudgetStore } from '../../hooks'
import { IAccountInstance } from '../../models'

export const AccountMenuItem = observer(
  ({ account }: { account: IAccountInstance }): JSX.Element => {
    const accountStore = useAccountStore()
    const budgetStore = useBudgetStore()
    const router = useRouter()
    const onAccountClick = () => {
      accountStore.setAccount(account)
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
)

interface IAccountMenuList {
  accounts: Map<string, IAccountInstance>
}

export const AccountMenuList = observer(
  ({ accounts }: IAccountMenuList): JSX.Element => {
    console.log(Array.from(accounts.values()))
    return (
      <List dense={true}>
        {Array.from(accounts.values()).map((account) => (
          <AccountMenuItem key={account.id} account={account} />
        ))}
      </List>
    )
  }
)
