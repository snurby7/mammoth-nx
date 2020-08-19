import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AxiosInterceptor } from '../providers'
import { RoutePaths } from '../routes'
import { BudgetSelectionPage, HubPage } from './pages'
import { InsightProvider, rootStore } from './providers'

export const ProtectedRoutes = (): JSX.Element => {
  return (
    <AxiosInterceptor>
      <InsightProvider value={rootStore}>
        <Switch>
          <Route exact path={RoutePaths.App} component={BudgetSelectionPage} />
          <Route path={RoutePaths.BudgetHub} component={HubPage} />
        </Switch>
      </InsightProvider>
    </AxiosInterceptor>
  )
}
