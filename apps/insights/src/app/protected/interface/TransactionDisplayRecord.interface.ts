export interface ITransactionDisplayRecord {
  id: string
  budgetId: string
  date: string
  inflow?: number
  outflow?: number
  memo?: string
  accountName: string
  payeeName: string
  categoryName: string
}
