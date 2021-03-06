import { PageConstraint } from '@mammoth/insights-ui'
import React from 'react'
import { LandingHeader } from '../components/LandingHeader'

export const LandingPage: React.FC = (): JSX.Element => {
  return (
    <PageConstraint>
      <LandingHeader />
    </PageConstraint>
  )
}
