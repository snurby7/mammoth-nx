import { Button } from '@mammoth/insights-ui'
import React from 'react'
import { budgetApi } from '../../api'
export const Hub: React.FC = ({}): JSX.Element => {
  const onClick = async () => {
    const budgets = await budgetApi.getBudgets()
    console.log(budgets)
  }
  return (
    <div>
      <Button onClick={onClick}>Click this to get budgets</Button>
    </div>
  )
}
