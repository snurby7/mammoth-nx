import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AxiosInterceptor } from '../providers'
import { RoutePaths } from '../routes'
import { BudgetSelectionPage } from './pages'
import { InsightProvider, rootStore } from './providers'
import { BudgetRouter } from './router/BudgetRouter'

export const ProtectedRoutes = (): JSX.Element => {
  return (
    <AxiosInterceptor>
      <InsightProvider value={rootStore}>
        <Switch>
          <Route exact path={RoutePaths.App} component={BudgetSelectionPage} />
          <Route path={RoutePaths.BudgetHub} component={BudgetRouter} />
        </Switch>
      </InsightProvider>
    </AxiosInterceptor>
  )
}
