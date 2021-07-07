import { ITransactionDetail } from '@mammoth/api-interfaces'
import { ITransactionGridRow } from '../../../interface'
import { dateFormatter } from '../../../utils'
import { rxAccountApi } from '../account'
import { rxCategoryApi } from '../category'
import { rxPayeeApi } from '../payee'

export class Transaction {
  public get detailRef(): ITransactionDetail {
    return this.detail
  }

  public toDetail(): ITransactionDetail {
    return {
      id: this.detailRef.id,
      account: rxAccountApi.getAccount(this.detailRef.accountId).formattedNode,
      accountId: this.detailRef.accountId,
      budgetId: this.detailRef.budgetId,
      category: rxCategoryApi.getCategory(this.detailRef.categoryId).formattedNode,
      categoryId: this.detailRef.categoryId,
      date: this.detailRef.date,
      inflow: this.detailRef.inflow,
      memo: this.detailRef.memo,
      outflow: this.detailRef.outflow,
      payee: rxPayeeApi.getPayee(this.detailRef.payeeId).formattedNode,
      payeeId: this.detailRef.payeeId,
    }
  }

  public toGridView(): ITransactionGridRow {
    return {
      id: this.detailRef.id,
      accountId: this.detailRef.accountId,
      budgetId: this.detailRef.budgetId,
      categoryId: this.detailRef.categoryId,
      date: dateFormatter.toDateString(this.detailRef.date),
      inflow: this.detailRef.inflow ?? 0,
      memo: this.detailRef.memo,
      outflow: this.detailRef.outflow ?? 0,
      payeeId: this.detailRef.payeeId,
    }
  }

  constructor(private detail: ITransactionDetail) {}
  public updateTransaction() {
    console.log('not implemented')
  }

  public deleteTransaction() {
    console.log('not implemented')
  }
}
