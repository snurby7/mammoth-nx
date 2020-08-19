import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { RoutePaths } from '../../routes'
import { AccountPage, HubPage } from '../pages'
export const BudgetRouter = () => {
  return (
    <Switch>
      <Route exact path={RoutePaths.BudgetHub} component={HubPage} />
      <Route path={RoutePaths.AccountPage} component={AccountPage} />
    </Switch>
  )
}
