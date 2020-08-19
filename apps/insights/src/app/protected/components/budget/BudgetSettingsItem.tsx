import { Button } from '@mammoth/insights-ui'
import { observer } from 'mobx-react'
import React from 'react'
import { IBudgetInstance } from '../../models'

interface IBudgetSettingsItemProps {
  selectedBudget?: IBudgetInstance
}

export const BudgetSettingsItem = observer(({ selectedBudget }: IBudgetSettingsItemProps) => {
  if (!selectedBudget) {
    return null
  }
  const onClick = () => {
    alert('Nothing here yet')
    // TODO: This will be similar to the YNAB budget button in the upper left.
  }

  return <Button onClick={onClick}>{selectedBudget.name}</Button>
})
