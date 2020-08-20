import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../utils'

export const AxiosInterceptor: React.FC = ({ children }): JSX.Element => {
  const { user, getAccessTokenSilently } = useAuth0()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isFetchingToken, setIsFetchingToken] = useState(false)

  useEffect(() => {
    let axiosInterceptor
    if (user && !isFetchingToken) {
      setIsFetchingToken(true)
      getAccessTokenSilently().then((token) => {
        setAccessToken(token)
        axiosInstance.interceptors.request.use((request) => {
          if (token) {
            request.headers['Authorization'] = `Bearer ${token}`
          }
          return request
        })
        setIsFetchingToken(false)
      })
    }

    return () => {
      if (axiosInterceptor) {
        return axiosInstance.interceptors.request.eject(axiosInterceptor)
      }
    }
  }, [getAccessTokenSilently, isFetchingToken, user])
  return <div>{!accessToken ? 'Loading...' : children}</div>
}
