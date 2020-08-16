import { Button } from '@mammoth/insights-ui'
import React from 'react'
import { useBudgetStore } from '../../hooks'
import { IBudgetSnap } from '../../models'

interface IBudgetListItemProps {
  budget: IBudgetSnap
}
export const BudgetListItem = ({ budget }: IBudgetListItemProps): JSX.Element => {
  const budgetStore = useBudgetStore()
  const onSelectBudget = () => {
    budgetStore.setBudget(budget)
  }
  return (
    <div>
      <h2>{budget.name}</h2>
      <div>{budget.createdDate}</div>
      <div>
        <Button onClick={onSelectBudget}>Select</Button>
      </div>
    </div>
  )
}
