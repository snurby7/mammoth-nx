import { Button } from '@mammoth/insights-ui'
import { observer } from 'mobx-react'
import React from 'react'
import { IBudgetInstance } from '../../models'

interface IBudgetViewRouteProps {
  selectedBudget?: IBudgetInstance
}

export const BudgetViewRoute = observer(({ selectedBudget }: IBudgetViewRouteProps) => {
  if (!selectedBudget) {
    return null
  }
  const onClick = () => {
    alert('Nothing here yet')
    // TODO: this will route to a budget view page like YNABs main landing page.
  }

  return <Button onClick={onClick}>View Budget</Button>
})
