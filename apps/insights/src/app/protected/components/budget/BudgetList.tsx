import styled from '@emotion/styled'
import { Button } from '@mammoth/insights-ui'
import { observer } from 'mobx-react'
import React from 'react'
import { useRouter } from '../../../hooks'
import { RoutePaths } from '../../../routes'
import { replaceKeyPlaceholders } from '../../../utils'
import { useBudgetStore } from '../../hooks'
import { IBudgetSnap } from '../../models'

const BudgetItemWrapper = styled.div`
  display: inline-block;
  background-color: lightgrey;
  border: 1px solid black;
  border-radius: 10px;
  padding: 1rem;
`

const BudgetHeader = styled.h2`
  margin-top: 0;
`

interface IBudgetListItemProps {
  budget: IBudgetSnap
}

const BudgetListItem = ({ budget }: IBudgetListItemProps): JSX.Element => {
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
    <BudgetItemWrapper>
      <BudgetHeader>{budget.name}</BudgetHeader>
      <div>{budget.createdDate}</div>
      <Button onClick={onSelectBudget}>Select</Button>
    </BudgetItemWrapper>
  )
}

interface IBudgetListProps {
  budgets: IBudgetSnap[]
}
export const BudgetList = observer(
  ({ budgets }: IBudgetListProps): JSX.Element => {
    return (
      <div>
        {budgets.map((budget) => (
          <BudgetListItem key={budget.id} budget={budget} />
        ))}
      </div>
    )
  }
)
