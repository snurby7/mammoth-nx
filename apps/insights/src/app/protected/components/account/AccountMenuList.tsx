import { observer } from 'mobx-react'
import React from 'react'
import { IAccountSnap } from '../../models'

export const AccountMenuItem = ({ account }: { account: IAccountSnap }): JSX.Element => {
  return (
    <div>
      {account.name} - {account.id}
    </div>
  )
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
