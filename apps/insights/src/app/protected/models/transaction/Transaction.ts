import { ITransactionDetail } from '@mammoth/api-interfaces'
import { ITransactionGridRow } from '../../../interface'
import { dateFormatter } from '../../../utils'

export class Transaction {
  public get detailRef(): ITransactionDetail {
    return this.detail
  }

  public toGridView(): ITransactionGridRow {
    return {
      id: this.detailRef.id,
      date: dateFormatter.toDateString(this.detailRef.date),
      accountId: this.detailRef.accountId,
      categoryId: this.detailRef.categoryId,
      payeeId: this.detailRef.payeeId,
      budgetId: this.detailRef.budgetId,
      inflow: this.detailRef.inflow,
      outflow: this.detailRef.outflow,
      memo: this.detailRef.memo,
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
