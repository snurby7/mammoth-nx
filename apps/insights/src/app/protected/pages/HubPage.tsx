import styled from '@emotion/styled'
import React from 'react'
import { useRouter } from '../../hooks'
import { BudgetMenuOptions } from '../components'
import { AccountMenuOptions } from '../components/account'
import {
  DynamicIncomeVsExpenseView,
  IncomeVsExpenseView,
  NetWorthView,
  SpendingByCategoryView,
  UpcomingExpenseView,
} from '../views'

const GridLayout = styled.div<{ columns: number; rows: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
`

interface IGridBlockProps {
  x: number
  xSpan: number
  y: number
  ySpan: number
}
const GridBlock = styled.div<IGridBlockProps>`
  grid-area: ${({ x, xSpan, y, ySpan }) => `${y} / ${x} / span ${ySpan} / span ${xSpan} `};
  background-color: palegoldenrod;
`

const GridCoordinate: React.FC<IGridBlockProps> = ({ children, ...props }): JSX.Element => {
  return <GridBlock {...props}>{children}</GridBlock>
}

export const HubPage = (): JSX.Element => {
  const router = useRouter()
  console.log(router.query)
  return (
    <div>
      <h2>Static Bar</h2>
      <GridLayout rows={5} columns={6}>
        <GridCoordinate y={1} x={1} ySpan={1} xSpan={1}>
          <BudgetMenuOptions />
        </GridCoordinate>
        <GridCoordinate y={2} x={1} ySpan={5} xSpan={1}>
          <AccountMenuOptions />
        </GridCoordinate>
        <GridCoordinate y={1} x={2} ySpan={2} xSpan={2}>
          <SpendingByCategoryView />
        </GridCoordinate>
        <GridCoordinate y={1} x={4} ySpan={2} xSpan={3}>
          <UpcomingExpenseView />
        </GridCoordinate>
        <GridCoordinate y={3} x={2} ySpan={2} xSpan={5}>
          <NetWorthView />
        </GridCoordinate>
        <GridCoordinate y={5} x={2} ySpan={2} xSpan={2}>
          <IncomeVsExpenseView />
        </GridCoordinate>
        <GridCoordinate y={5} x={4} ySpan={2} xSpan={3}>
          <DynamicIncomeVsExpenseView />
        </GridCoordinate>
      </GridLayout>
    </div>
  )
}
