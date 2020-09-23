export interface ITransactionGridRow {
  id?: string
  budgetId: string
  date: string
  accountId: string
  categoryId: string
  payeeId: string
  inflow?: number
  outflow?: number
  memo?: string
}
