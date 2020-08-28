export interface ITransactionGridRow {
  id?: string
  budgetId: string
  date: string
  account: string
  category: string
  payee: string
  inflow?: number
  outflow?: number
  memo?: string
}
