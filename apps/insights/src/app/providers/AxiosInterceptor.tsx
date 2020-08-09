import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
export const AxiosInterceptor: React.FC = ({ children }): JSX.Element => {
  const { user, getAccessTokenSilently } = useAuth0()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isFetchingToken, setIsFetchingToken] = useState(false)
  if (user && !accessToken && !isFetchingToken) {
    setIsFetchingToken(true)
    getAccessTokenSilently().then((token) => {
      setAccessToken(token)
      setIsFetchingToken(false)
    })
  }
  useEffect(() => {
    const axiosInterceptor = axios.interceptors.request.use((request) => {
      if (accessToken) {
        request.headers['Authorization'] = `Bearer ${accessToken}`
      }
      return request
    })
    return () => {
      return axios.interceptors.request.eject(axiosInterceptor)
    }
  }, [accessToken])
  return <div>{children}</div>
}
