import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { RoutePaths } from '../../routes'
import { AccountMenuOptions, BudgetMenuOptions, PageLayout } from '../components'
import { useBudgetStore } from '../hooks'
import { AccountPage, HubPage, TransactionsPage } from '../pages'
import { DataProvider } from './DataProvider'

export const BudgetRouter = () => {
  const budgetStore = useBudgetStore()
  return (
    <DataProvider selectedBudget={budgetStore.selectedBudget}>
      <PageLayout
        budgetListConfig={<BudgetMenuOptions />}
        accountListConfig={<AccountMenuOptions />}
        content={
          <Switch>
            <Route exact path={RoutePaths.BudgetHub} component={HubPage} />
            <Route path={RoutePaths.AccountPage} component={AccountPage} />
            <Route path={RoutePaths.TransactionsPage} component={TransactionsPage} />
          </Switch>
        }
      />
    </DataProvider>
  )
}
