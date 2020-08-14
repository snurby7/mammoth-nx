import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mammoth/insights-ui'
import { Person } from '@material-ui/icons'
import React from 'react'

export const AuthButton: React.FC = (): JSX.Element => {
  const { loginWithRedirect, logout, user } = useAuth0()

  const onClick = () => {
    if (user) {
      logout()
    } else {
      loginWithRedirect({})
    }
  }

  return (
    <Button onClick={onClick}>
      <Person />
      {user?.name ?? 'Login'}
    </Button>
  )
}
