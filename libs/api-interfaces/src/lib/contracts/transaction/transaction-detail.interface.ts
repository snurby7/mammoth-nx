import { ITransactionDetailLinks } from './transaction-detail-links.interface'

export interface IDateModel {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

export interface ITransactionDetail extends ITransactionDetailLinks {
  id: string
  budgetId: string
  date: IDateModel
  inflow?: number
  outflow?: number
  memo?: string
}
