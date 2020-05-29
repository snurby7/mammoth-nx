import { ITransactionDetailLinks } from './transaction-detail-links.interface';

export interface ITransactionDetail extends ITransactionDetailLinks {
  id: string;
  budgetId: string;
  date: string;
  inflow?: number;
  outflow?: number;
  memo?: string;
}
