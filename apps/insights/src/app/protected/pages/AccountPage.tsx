/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { useRouter } from '../../hooks'
import { DataTable } from '../components'
import { useAccountStore, useBudgetStore } from '../hooks'
export const AccountPage = () => {
  const { params } = useRouter()
  console.log('------> ', params)
  const accountStore = useAccountStore()
  const budgetStore = useBudgetStore()
  if (!accountStore.selectedAccount || !budgetStore.selectedBudget) {
    console.log('no budget selected or no account selected')
    return null
  }
  const { id: budgetId } = budgetStore.selectedBudget
  const { id: accountId } = accountStore.selectedAccount
  console.log(`BudgetId => ${budgetId} - AccountId ${accountId}`)
  return (
    <article>
      <DataTable />
    </article>
  )
}
