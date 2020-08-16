import { observer } from 'mobx-react'
import React from 'react'
import { IBudgetSnap } from '../../models'
import { BudgetListItem } from './BudgetListItem'
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
