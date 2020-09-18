import { useAuth0 } from '@auth0/auth0-react'
import React, { useCallback } from 'react'
import { Route, RouteProps } from 'react-router-dom'
import { useRouter } from '../hooks'

export const AuthenticatedRoute = (props: RouteProps) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect } = useAuth0()
  const router = useRouter()
  const authCallback = useCallback(async () => {
    const result = await getAccessTokenSilently()
    if (!result) {
      loginWithRedirect({}).then(() => {
        router.push(router.pathname)
      })
    }
  }, [getAccessTokenSilently, loginWithRedirect, router])

  if (!isAuthenticated) {
    authCallback()
  }

  // TODO: This probably needs some more TLC, but it makes the route be authenticated
  // Current Issue is when on the page and it hot reloads it doesn't go back to the page.
  return isLoading ? <div>Loading...</div> : <Route {...props} />
}
