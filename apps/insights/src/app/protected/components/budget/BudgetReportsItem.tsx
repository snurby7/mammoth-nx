import { Button } from '@mammoth/insights-ui'
import { observer } from 'mobx-react'
import React from 'react'
import { IBudgetInstance } from '../../models'

interface IBudgetReportsItemsProps {
  selectedBudget?: IBudgetInstance
}

export const BudgetReportsItems = observer(({ selectedBudget }: IBudgetReportsItemsProps) => {
  if (!selectedBudget) {
    return null
  }
  const onClick = () => {
    alert('Nothing here yet')
    // TODO: this will route to a reports page where different things can be viewed
  }

  return <Button onClick={onClick}>Reports</Button>
})
