import { Button } from '@mammoth/insights-ui'
import { observer } from 'mobx-react'
import React from 'react'
import { useRouter } from '../../../hooks'
import { RoutePaths } from '../../../routes'
import { replaceKeyPlaceholders } from '../../../utils'
import { useAccountStore, useBudgetStore } from '../../hooks'
import { IAccountSnap } from '../../models'

export const AccountMenuItem = ({ account }: { account: IAccountSnap }): JSX.Element => {
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
  return <Button onClick={onAccountClick}>{account.name}</Button>
}

export const AccountMenuList = observer(
  ({ accounts }: { accounts: IAccountSnap[] }): JSX.Element => {
    return (
      <div>
        {accounts.map((account) => (
          <AccountMenuItem key={account.id} account={account} />
        ))}
      </div>
    )
  }
)
