import queryString from 'query-string'
import { useMemo } from 'react'
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'

/**
 * useRouter is a wrapper around methods that are exposed by `react-router-dom` to allow for a one stop shop of data grabbing
 * - `push` is a custom method you can use to handle routing.
 */
export const useRouter = <TState extends any>() => {
  const params = useParams()
  const location = useLocation<TState>()
  const history = useHistory<any>()
  const match = useRouteMatch()

  return useMemo(() => {
    return {
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      match,
      location,
      history,
      listen: history.listen,
      state: location.state,
    }
  }, [history, location, params, match])
}
