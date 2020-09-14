/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ITransactionDetail } from '@mammoth/api-interfaces'
import React from 'react'
import { useTransactionStore } from '../../hooks'
import { ITransactionInstance } from '../../models'
import { IColumnExtension, IDataColumn, TransactionDataTable } from './TransactionTable'

const today = new Date()

export const FutureTransactionTableView = () => {
  const { transactions } = useTransactionStore()

  const dataColumns: IDataColumn<ITransactionDetail>[] = [
    { name: 'date', title: 'Date', isRequired: true },
    { name: 'payee', title: 'Payee', isRequired: true },
    { name: 'account', title: 'Account', isRequired: true },
    { name: 'category', title: 'Category', isRequired: true },
    // the server is smart enough to know how to handle the case where either
    // inflow or outflow must be present and will reject if neither is there.
    { name: 'inflow', title: 'Inflow', isRequired: false },
    { name: 'outflow', title: 'Outflow', isRequired: false },
  ]

  const columnExtensions: IColumnExtension<ITransactionDetail>[] = [
    { columnName: 'payee', width: '200px' },
    { columnName: 'category', width: '200px' },
  ]

  const dataFilter = (transaction: ITransactionInstance) => {
    return transaction.transactionDate > today
  }

  return (
    <article>
      <TransactionDataTable
        transactions={transactions}
        columns={dataColumns}
        columnExtensions={columnExtensions}
        hideControls={true}
        filter={dataFilter}
      />
    </article>
  )
}
