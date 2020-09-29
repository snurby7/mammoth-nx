/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ITransactionDetail } from '@mammoth/api-interfaces'
import React, { useEffect } from 'react'
import { map } from 'rxjs/operators'
import { IColumnExtension, IDataColumn, TransactionDataTable } from '../components'
import { useBudgetStore, useTransactionStore } from '../hooks'
import { rxTransactionApi } from '../models/transaction'
export const TransactionsPage = () => {
  const { selectedBudget } = useBudgetStore()
  const selectedBudgetId = selectedBudget!.id
  const { searchTransactionsByQuery } = useTransactionStore()

  useEffect(() => {
    rxTransactionApi.searchTransactionsByQuery(selectedBudgetId)
  }, [searchTransactionsByQuery, selectedBudgetId])

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
              (transaction) => transaction.detailRef.budgetId === selectedBudgetId
            )
          )
        )}
        columns={dataColumns}
        columnExtensions={columnExtensions}
      />
    </article>
  )
}
