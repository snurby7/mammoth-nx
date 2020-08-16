import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ProtectedRoutes } from './protected'
import { LandingPage } from './public'
import { RoutePaths } from './routes'

export const AppRoutes: React.FC<{}> = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={RoutePaths.Default} component={LandingPage} />
        <Route path={RoutePaths.App} component={ProtectedRoutes} />
      </Switch>
    </BrowserRouter>
  )
}
