import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AccountBalanceOutlined } from '@material-ui/icons'
import { observer } from 'mobx-react'
import React from 'react'
import { useRouter } from '../../../hooks'
import { RoutePaths } from '../../../routes'
import { replaceKeyPlaceholders } from '../../../utils'
import { useAccountStore, useBudgetStore } from '../../hooks'
import { IAccountInstance } from '../../models'

export const AccountMenuItem = ({ account }: { account: IAccountInstance }): JSX.Element => {
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
  return (
    <ListItem button onClick={onAccountClick}>
      <ListItemIcon>
        <AccountBalanceOutlined />
      </ListItemIcon>
      <ListItemText primary={account.name} />
    </ListItem>
  )
}

export const AccountMenuList = observer(
  ({ accounts }: { accounts: IAccountInstance[] }): JSX.Element => {
    return (
      <List>
        {accounts.map((account) => (
          <AccountMenuItem key={account.id} account={account} />
        ))}
      </List>
    )
  }
)
