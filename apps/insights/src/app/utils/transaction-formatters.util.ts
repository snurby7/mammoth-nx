import {
  ICreateTransaction,
  IDateModel,
  ITransaction,
  ITransactionDetail,
} from '@mammoth/api-interfaces'
import { ITransactionGridRow } from '../interface'
import { dateFormatter } from './formatters.utils'
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
      date: detail.date ? dateFormatter.toDateString(detail.date) : '', // TODO: Transaction - make sure this also works
    }
    return parser.removeEmpty(response)
  },
  toCreateTransaction(detail: ITransactionGridRow): ICreateTransaction {
    return {
      budgetId: detail.budgetId,
      date: detail.date,
      accountId: detail.accountId,
      payeeId: detail.payeeId,
      categoryId: detail.categoryId,
      memo: detail.memo,
      inflow: detail.inflow === undefined ? undefined : detail.inflow,
      outflow: detail.outflow === undefined ? undefined : -detail.outflow,
    }
  },
}

const mapToTransactionDetail = (transaction: ITransaction): ITransactionDetail => {
  return {
    id: '',
    budgetId: '',
    account: { id: '', value: '' },
    payee: { id: '', value: '' },
    category: { id: '', value: '' },
    date: {} as IDateModel, // TODO: Transaction - Need to map this correctly
    categoryId: '',
    payeeId: '',
    accountId: '',
  }
}

export const toTransactionDetail = (transactions: ITransaction): ITransactionDetail => {
  return mapToTransactionDetail(transactions)
}

export const toTransactionDetails = (transactions: ITransaction[]): ITransactionDetail[] => {
  return transactions.map((transaction) => mapToTransactionDetail(transaction))
}
