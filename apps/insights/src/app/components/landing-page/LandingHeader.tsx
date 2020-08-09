import { useAuth0 } from '@auth0/auth0-react'
import styled from '@emotion/styled'
import { Header, MammothIcon } from '@mammoth/insights-ui'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { RoutePaths } from '../../routes'
import { AuthButton } from '../common'

const StyledMammothIcon = styled(MammothIcon)`
  align-self: flex-start;
`

const FlexEndContainer = styled.div`
  display: flex;
  align-self: flex-end;
  flex-grow: 1;
`

export const LandingHeader: React.FC = (): JSX.Element => {
  const history = useHistory()
  const { user } = useAuth0()
  if (user) {
    history.push(RoutePaths.App)
  }
  return (
    <Header>
      <StyledMammothIcon />
      <FlexEndContainer>
        <div className="ml-auto">
          <AuthButton />
        </div>
      </FlexEndContainer>
    </Header>
  )
}
