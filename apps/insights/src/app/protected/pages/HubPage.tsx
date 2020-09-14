import styled from '@emotion/styled'
import React from 'react'
import {
  DynamicIncomeVsExpenseView,
  IncomeVsExpenseView,
  NetWorthView,
  SpendingByCategoryView,
  UpcomingExpenseView,
} from '../views'

const FlexRow = styled.div<{ columns?: number }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  * {
    flex: 1 1 auto;
    margin: 0.5rem;
  }
`

export const HubPage = (): JSX.Element => {
  return (
    <article>
      <FlexRow columns={2}>
        <SpendingByCategoryView />
        <UpcomingExpenseView />
      </FlexRow>
      <FlexRow>
        <NetWorthView />
      </FlexRow>
      <FlexRow>
        <IncomeVsExpenseView />
        <DynamicIncomeVsExpenseView />
      </FlexRow>
    </article>
  )
}
