import { Button } from '@mammoth/insights-ui'
import React from 'react'
import { BudgetList } from '../components'
import { useBudgetStore } from '../hooks'

export const BudgetSelectionPage = (): JSX.Element => {
  const budgetStore = useBudgetStore()
  const onClick = () => {
    budgetStore.loadBudgets()
  }
  return (
    <div>
      <Button onClick={onClick}>Click this to get budgets</Button>
      <BudgetList budgets={budgetStore.budgets} />
    </div>
  )
}
