import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { AxiosInterceptor } from '../providers'
import { DashboardPage } from './protected'

export const DashboardRoutes = (): JSX.Element => {
  const { path } = useRouteMatch()
  return (
    <AxiosInterceptor>
      <Switch>
        <Route exact path={path} component={DashboardPage} />
      </Switch>
    </AxiosInterceptor>
  )
}
