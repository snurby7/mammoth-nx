import { ICreateTransaction, ITransaction, ITransactionDetail } from '@mammoth/api-interfaces'
import { ITransactionGridRow } from '../interface'
import { parser } from './parser.util'

export const transactionFormatter = {
  toPartialTransaction(detail: Partial<ITransactionDetail>): Partial<ITransaction> {
    const response: Partial<ITransaction> = {
      id: detail.id ?? undefined,
      budgetId: detail.budgetId,
      categoryId: detail.category?.id ?? detail.categoryId,
      payeeId: detail.payee?.id ?? detail.payeeId,
      accountId: detail.account?.id ?? detail.accountId,
      memo: detail.memo,
      inflow: detail.inflow === undefined ? undefined : detail.inflow,
      outflow: detail.outflow === undefined ? undefined : -detail.outflow,
      date: detail.date,
    }
    return parser.removeEmpty(response)
  },
  toCreateTransaction(detail: ITransactionGridRow): ICreateTransaction {
    return {
      budgetId: detail.budgetId,
      date: detail.date,
      accountId: detail.account,
      payeeId: detail.payee,
      categoryId: detail.category,
      memo: detail.memo,
      inflow: detail.inflow === undefined ? undefined : detail.inflow,
      outflow: detail.outflow === undefined ? undefined : -detail.outflow,
    }
  },
}
