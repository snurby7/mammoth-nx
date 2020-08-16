import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useRouter } from '../hooks'
import { AxiosInterceptor } from '../providers'
import { RoutePaths } from '../routes'
import { BudgetSelectionPage, HubPage } from './pages'
import { InsightProvider, rootStore } from './providers'

export const ProtectedRoutes = (): JSX.Element => {
  const { match } = useRouter()
  console.log(match)
  return (
    <InsightProvider value={rootStore}>
      <AxiosInterceptor>
        <Switch>
          <Route exact path={RoutePaths.App} component={BudgetSelectionPage} />
          <Route path={RoutePaths.BudgetHub} component={HubPage} />
        </Switch>
      </AxiosInterceptor>
    </InsightProvider>
  )
}
