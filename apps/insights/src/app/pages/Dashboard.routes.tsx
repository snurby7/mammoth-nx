import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { AxiosInterceptor } from '../providers'
import { Dashboard } from './protected'

export const DashboardRoutes = (): JSX.Element => {
  const { path } = useRouteMatch()
  return (
    <AxiosInterceptor>
      <Switch>
        <Route exact path={path} component={Dashboard} />
      </Switch>
    </AxiosInterceptor>
  )
}
