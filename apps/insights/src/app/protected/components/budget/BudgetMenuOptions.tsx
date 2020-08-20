import styled from '@emotion/styled'
import { List } from '@material-ui/core'
import React from 'react'
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
  return (
    <FlexColumnWrapper>
      <List>
        <BudgetSettingsItem selectedBudget={budgetStore.selectedBudget} />
        <BudgetViewRoute selectedBudget={budgetStore.selectedBudget} />
        <BudgetReportsItems selectedBudget={budgetStore.selectedBudget} />
        <ViewAllAccounts />
      </List>
    </FlexColumnWrapper>
  )
}
