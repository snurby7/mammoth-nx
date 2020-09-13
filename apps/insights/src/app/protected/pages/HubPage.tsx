import styled from '@emotion/styled'
import React from 'react'
import {
  DynamicIncomeVsExpenseView,
  IncomeVsExpenseView,
  NetWorthView,
  SpendingByCategoryView,
  UpcomingExpenseView,
} from '../views'

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  * {
    margin: 0.5rem;
  }
`
export const HubPage = (): JSX.Element => {
  return (
    <article>
      <FlexRow>
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
