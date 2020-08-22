/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { IDataColumn, TransactionDataTable } from '../components'
import { useAccountStore, useTransactionStore } from '../hooks'
import { ITransactionDisplayRecord } from '../interface'
export const AccountPage = () => {
  const accountStore = useAccountStore()
  const transactionStore = useTransactionStore()

  useEffect(() => {
    if (accountStore.selectedAccount) {
      // must be defined in order to get this to work and optional chaining makes that slightly less clear
      accountStore.selectedAccount.loadTransactions()
    }
  }, [accountStore.selectedAccount])

  const dataColumns: IDataColumn<ITransactionDisplayRecord>[] = [
    { name: 'date', title: 'Date' },
    { name: 'accountName', title: 'Account' },
    { name: 'payeeName', title: 'Payee' },
    { name: 'categoryName', title: 'Category' },
    { name: 'memo', title: 'Memo' },
    { name: 'inflow', title: 'Inflow' },
    { name: 'outflow', title: 'Outflow' },
  ]
  return (
    <article>
      <TransactionDataTable transactions={transactionStore.transactions} columns={dataColumns} />
    </article>
  )
}
