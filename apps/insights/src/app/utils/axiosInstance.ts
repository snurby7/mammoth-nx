import { default as Axios } from 'axios'

const axios = Axios.create()

let authorizationToken: string | null = null

export const setAuthorizationToken = (token: string): void => {
  authorizationToken = token
}

axios.interceptors.request.use((request) => {
  console.log('token setting', authorizationToken)
  if (authorizationToken) {
    request.headers['Authorization'] = `Bearer ${authorizationToken}`
  }
  return request
})

export const axiosInstance = axios
