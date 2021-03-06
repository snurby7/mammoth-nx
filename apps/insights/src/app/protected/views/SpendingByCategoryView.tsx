/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { SpendingByCategoryChart } from '../components'
import { useBudgetStore, useTransactionStore } from '../hooks'

export const SpendingByCategoryView = (): JSX.Element => {
  const { searchTransactionDateRange, pastMonthTransaction } = useTransactionStore()
  const budgetStore = useBudgetStore()

  useEffect(() => {
    const date = new Date()
    searchTransactionDateRange(budgetStore.selectedBudget!.id, {
      dayStart: 1,
      dayEnd: date.getDate(),
      monthEnd: date.getMonth() + 2,
      monthStart: date.getMonth() + 1,
      yearEnd: date.getFullYear(),
      yearStart: date.getFullYear(),
    })
  }, [budgetStore.selectedBudget, searchTransactionDateRange])

  return (
    <section style={{ width: 600, height: 550 }}>
      <Typography variant="h4">Month Spend/Category</Typography>
      <SpendingByCategoryChart transactions={pastMonthTransaction} />
    </section>
  )
}
