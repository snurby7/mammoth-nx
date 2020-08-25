/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ITransactionDetail } from '@mammoth/api-interfaces'
import React, { useCallback, useEffect } from 'react'
import { IDataColumn, TransactionDataTable } from '../components'
import { useAccountStore, useTransactionStore } from '../hooks'
import { ITransactionInstance } from '../models'
export const AccountPage = () => {
  const accountStore = useAccountStore()
  const transactionStore = useTransactionStore()

  useEffect(() => {
    if (accountStore.selectedAccount) {
      // must be defined in order to get this to work and optional chaining makes that slightly less clear
      accountStore.selectedAccount.loadTransactions()
    }
  }, [accountStore.selectedAccount])

  const dataColumns: IDataColumn<ITransactionDetail>[] = [
    { name: 'date', title: 'Date' },
    { name: 'payee', title: 'Payee' },
    { name: 'account', title: 'Account' },
    { name: 'category', title: 'Category' },
    { name: 'memo', title: 'Memo' },
    { name: 'inflow', title: 'Inflow' },
    { name: 'outflow', title: 'Outflow' },
  ]

  const dataFilter = useCallback(
    (record: ITransactionInstance) => {
      return record.accountId.id === accountStore.selectedAccount.id
    },
    [accountStore.selectedAccount]
  )
  return (
    <article>
      <TransactionDataTable
        transactions={transactionStore.transactions}
        columns={dataColumns}
        filter={dataFilter}
      />
    </article>
  )
}
