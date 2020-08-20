import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AssessmentOutlined } from '@material-ui/icons'
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

  return (
    <ListItem button key={'View Budget'} onClick={onClick}>
      <ListItemIcon>
        <AssessmentOutlined />
      </ListItemIcon>
      <ListItemText primary="View Budget" />
    </ListItem>
  )
})
