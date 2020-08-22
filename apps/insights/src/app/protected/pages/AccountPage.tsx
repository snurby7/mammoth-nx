/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { DataTable } from '../components'
import { useAccountStore } from '../hooks'
export const AccountPage = () => {
  const accountStore = useAccountStore()
  const selectedAccount = accountStore.selectedAccount
  console.log(`BudgetId => ${selectedAccount.budgetId} - AccountId ${selectedAccount.accountId}`)
  useEffect(() => {
    accountStore.selectedAccount.loadTransactions()
  }, [accountStore.selectedAccount])
  return (
    <article>
      <DataTable rows={[]} columns={[{ name: '', title: '' }]} />
    </article>
  )
}
