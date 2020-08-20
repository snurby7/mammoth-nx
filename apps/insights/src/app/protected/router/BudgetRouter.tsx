import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { RoutePaths } from '../../routes'
import { AccountMenuOptions, BudgetMenuOptions, PageLayout } from '../components'
import { AccountPage, HubPage } from '../pages'

export const BudgetRouter = () => {
  return (
    <PageLayout
      budgetListConfig={<BudgetMenuOptions />}
      accountListConfig={<AccountMenuOptions />}
      content={
        <Switch>
          <Route exact path={RoutePaths.BudgetHub} component={HubPage} />
          <Route path={RoutePaths.AccountPage} component={AccountPage} />
        </Switch>
      }
    />
  )
}
