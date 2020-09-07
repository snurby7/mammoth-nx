import styled from '@emotion/styled'
import { Button } from '@mammoth/insights-ui'
import React, { useEffect } from 'react'
import { BudgetList } from '../components'
import { useBudgetStore } from '../hooks'

const BudgetSelectionWrapper = styled.div`
  padding: 1rem;
`

const BudgetSelectionHeader = styled.h2`
  margin-top: 0;
`

export const BudgetSelectionPage = (): JSX.Element => {
  const budgetStore = useBudgetStore()
  useEffect(() => {
    budgetStore.loadBudgets()
  }, [budgetStore])

  return (
    <BudgetSelectionWrapper>
      <BudgetSelectionHeader>Select a budget!</BudgetSelectionHeader>
      <BudgetList budgets={budgetStore.budgets} />
      <Button onClick={() => budgetStore.createBudget('Temp Budget')}>Create Budget</Button>
    </BudgetSelectionWrapper>
  )
}
