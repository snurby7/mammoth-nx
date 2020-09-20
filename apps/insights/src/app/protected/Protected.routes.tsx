import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { RoutePaths } from '../routes'
import { rootStore } from './models'
import { BudgetSelectionPage } from './pages'
import { InsightProvider } from './providers'
import { BudgetRouter } from './router/BudgetRouter'

export const ProtectedRoutes = (): JSX.Element => {
  return (
    <InsightProvider value={rootStore}>
      <Switch>
        <Route exact path={RoutePaths.App} component={BudgetSelectionPage} />
        <Route path={RoutePaths.BudgetHub} component={BudgetRouter} />
      </Switch>
    </InsightProvider>
  )
}
