/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { useBudgetStore, useTransactionStore } from '../hooks'

export const SpendingByCategoryView = (): JSX.Element => {
  const transactionStore = useTransactionStore()
  const budgetStore = useBudgetStore()

  useEffect(() => {
    const date = new Date()
    transactionStore.searchTransactionDateRange(budgetStore.selectedBudget!.id, {
      dayStart: 1,
      dayEnd: date.getDate(),
      monthEnd: date.getMonth() + 2,
      monthStart: date.getMonth() + 1,
      yearEnd: date.getFullYear(),
      yearStart: date.getFullYear(),
    })
  }, [budgetStore.selectedBudget, transactionStore])

  return <section>Upcoming Expenses</section>
}
