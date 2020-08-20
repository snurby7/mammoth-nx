import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { SettingsOutlined } from '@material-ui/icons'
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
  // TODO The budget name can be quite long, so probably want a tooltip on this and an ellipsis so no side scroll
  return (
    <ListItem button key={selectedBudget.name} onClick={onClick}>
      <ListItemIcon>
        <SettingsOutlined />
      </ListItemIcon>
      <ListItemText primary={selectedBudget.name} />
    </ListItem>
  )
})
