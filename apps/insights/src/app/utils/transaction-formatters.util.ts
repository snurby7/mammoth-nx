import { ITransaction, ITransactionDetail } from '@mammoth/api-interfaces'
import { parser } from './parser.util'

export const transactionFormatter = {
  toTransaction(detail: Partial<ITransactionDetail>): Partial<ITransaction> {
    const response: Partial<ITransaction> = {
      id: detail.id ?? undefined,
      budgetId: detail.budgetId,
      categoryId: detail.category?.id ?? detail.categoryId,
      payeeId: detail.payee?.id ?? detail.payeeId,
      accountId: detail.account?.id ?? detail.accountId,
      memo: detail.memo,
      inflow: detail.inflow,
      outflow: detail.outflow,
      date: detail.date,
    }
    return parser.removeEmpty(response)
  },
}
