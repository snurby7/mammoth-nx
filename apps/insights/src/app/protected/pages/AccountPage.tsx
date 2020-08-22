/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { DataTable } from '../components'
import { useAccountStore } from '../hooks'
export const AccountPage = () => {
  const accountStore = useAccountStore()
  const seletedAccount = accountStore.selectedAccount
  console.log(`BudgetId => ${seletedAccount.budgetId} - AccountId ${seletedAccount.accountId}`)
  useEffect(() => {
    accountStore.selectedAccount.loadTransactions()
  }, [accountStore.selectedAccount])
  return (
    <article>
      <DataTable rows={[]} columns={[{ name: '', title: '' }]} />
    </article>
  )
}
