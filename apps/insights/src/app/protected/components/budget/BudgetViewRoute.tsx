import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AssessmentOutlined } from '@material-ui/icons'
import { observer } from 'mobx-react'
import React from 'react'
import { useRouter } from '../../../hooks'
import { RoutePaths } from '../../../routes'
import { replaceKeyPlaceholders } from '../../../utils'
import { IBudgetInstance } from '../../models'

interface IBudgetViewRouteProps {
  selectedBudget?: IBudgetInstance
}

export const BudgetViewRoute = observer(({ selectedBudget }: IBudgetViewRouteProps) => {
  const router = useRouter()

  if (!selectedBudget) {
    return null
  }

  const onItemClick = () => {
    router.push(
      replaceKeyPlaceholders(RoutePaths.CategoryBreakdownPage, { budgetId: selectedBudget.id })
    )
  }

  return (
    <ListItem button key={'View Budget'} onClick={onItemClick}>
      <ListItemIcon>
        <AssessmentOutlined />
      </ListItemIcon>
      <ListItemText primary="View Budget" />
    </ListItem>
  )
})
