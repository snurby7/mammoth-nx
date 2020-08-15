import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useRouter } from '../hooks'
import { AxiosInterceptor } from '../providers'
import { HubPage } from './pages/HubPage'
import { InsightProvider, rootStore } from './providers'

export const ProtectedRoutes = (): JSX.Element => {
  const { match } = useRouter()

  return (
    <InsightProvider value={rootStore}>
      <AxiosInterceptor>
        <Switch>
          <Route exact path={match.path} component={HubPage} />
        </Switch>
      </AxiosInterceptor>
    </InsightProvider>
  )
}
