import { observer } from 'mobx-react'
import React from 'react'
import { ITransactionInstance } from '../../models'

interface ICategoryBreakdownProps {
  transactions: ITransactionInstance[]
}
export const CategoryBreakdown = observer(({ transactions }: ICategoryBreakdownProps) => {
  return <div>Breakdown the transactions by category</div>
})
