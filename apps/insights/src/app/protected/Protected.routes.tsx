import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useRouter } from '../hooks'
import { AxiosInterceptor } from '../providers'
import { HubPage } from './pages/HubPage'

export const ProtectedRoutes = (): JSX.Element => {
  const { match } = useRouter()

  return (
    <AxiosInterceptor>
      <Switch>
        <Route exact path={match.path} component={HubPage} />
      </Switch>
    </AxiosInterceptor>
  )
}
