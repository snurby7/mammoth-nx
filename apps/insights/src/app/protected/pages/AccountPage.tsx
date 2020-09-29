/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ITransactionDetail } from '@mammoth/api-interfaces'
import React, { useEffect } from 'react'
import { map } from 'rxjs/operators'
import { IColumnExtension, IDataColumn, TransactionDataTable } from '../components'
import { rxAccountApi } from '../models/account'
import { rxTransactionApi } from '../models/transaction'
export const AccountPage = () => {
  const viewAccount = rxAccountApi.viewAccountRef

  useEffect(() => {
    if (viewAccount) {
      // must be defined in order to get this to work and optional chaining makes that slightly less clear
      viewAccount.getTransactionsByAccount()
    }
  }, [viewAccount])

  const dataColumns: IDataColumn<ITransactionDetail>[] = [
    { name: 'date', title: 'Date', isRequired: true },
    { name: 'payee', title: 'Payee', isRequired: true },
    { name: 'account', title: 'Account', isRequired: true },
    { name: 'category', title: 'Category', isRequired: true },
    { name: 'memo', title: 'Memo', isRequired: false },
    // the server is smart enough to know how to handle the case where either
    // inflow or outflow must be present and will reject if neither is there.
    { name: 'inflow', title: 'Inflow', isRequired: false },
    { name: 'outflow', title: 'Outflow', isRequired: false },
  ]

  const columnExtensions: IColumnExtension<ITransactionDetail>[] = [
    { columnName: 'payee', width: '200px' },
    { columnName: 'category', width: '200px' },
  ]

  return (
    <article>
      <TransactionDataTable
        transactions$={rxTransactionApi.transactions$.pipe(
          map((transactions) =>
            transactions.filter(
              (transaction) => transaction.detailRef.accountId === viewAccount.detailRef.id
            )
          )
        )}
        columns={dataColumns}
        columnExtensions={columnExtensions}
      />
    </article>
  )
}
