import styled from '@emotion/styled'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { HomeOutlined } from '@material-ui/icons'
import React from 'react'
import { useRouter } from '../../../hooks'
import { RoutePaths } from '../../../routes'
import { replaceKeyPlaceholders } from '../../../utils'
import { useBudgetStore } from '../../hooks'
import { ViewAllAccounts } from '../account'
import { BudgetReportsItems } from './BudgetReportsItem'
import { BudgetSettingsItem } from './BudgetSettingsItem'
import { BudgetViewRoute } from './BudgetViewRoute'

const FlexColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`

export const BudgetMenuOptions = (): JSX.Element => {
  const budgetStore = useBudgetStore()
  const router = useRouter()
  return (
    <FlexColumnWrapper>
      <List>
        <BudgetSettingsItem selectedBudget={budgetStore.selectedBudget} />
        <ListItem
          button
          key={'Home'}
          onClick={() =>
            router.push(
              replaceKeyPlaceholders(RoutePaths.BudgetHub, {
                budgetId: budgetStore.selectedBudget?.id,
              })
            )
          }
        >
          <ListItemIcon>
            <HomeOutlined />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <BudgetViewRoute selectedBudget={budgetStore.selectedBudget} />
        <BudgetReportsItems selectedBudget={budgetStore.selectedBudget} />
        <ViewAllAccounts />
      </List>
    </FlexColumnWrapper>
  )
}
