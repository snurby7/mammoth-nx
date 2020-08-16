import { Button } from '@mammoth/insights-ui'
import React from 'react'
import { useRouter } from '../../../hooks'
import { RoutePaths } from '../../../routes'
import { replaceKeyPlaceholders } from '../../../utils'
import { useBudgetStore } from '../../hooks'
import { IBudgetSnap } from '../../models'

interface IBudgetListItemProps {
  budget: IBudgetSnap
}
export const BudgetListItem = ({ budget }: IBudgetListItemProps): JSX.Element => {
  const budgetStore = useBudgetStore()
  const router = useRouter()
  const onSelectBudget = () => {
    budgetStore.setBudget(budget)
    router.push(
      replaceKeyPlaceholders(RoutePaths.BudgetHub, {
        budgetId: budget.id,
      })
    )
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
