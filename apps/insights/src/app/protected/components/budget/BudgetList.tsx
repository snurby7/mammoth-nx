import { observer } from 'mobx-react'
import React from 'react'
import { IBudgetSnap } from '../../models'
interface IBudgetListProps {
  budgets: IBudgetSnap[]
}
export const BudgetList = observer(
  ({ budgets }: IBudgetListProps): JSX.Element => {
    return (
      <div>
        {budgets.map((budget) => (
          <div key={budget.id}>
            This is budget {budget.name} created on {budget.createdDate} with ID {budget.id}{' '}
          </div>
        ))}
      </div>
    )
  }
)
