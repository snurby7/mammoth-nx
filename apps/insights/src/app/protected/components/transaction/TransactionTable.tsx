import { Column, EditingState } from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableEditColumn,
  TableEditRow,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'
import Paper from '@material-ui/core/Paper'
import { keys } from 'mobx'
import { observer } from 'mobx-react'
import { SnapshotIn } from 'mobx-state-tree'
import React from 'react'
import { ITransactionInstance, Transaction } from '../../models'

const getRowId = (row) => {
  console.log(row) // TODO this should be a Transaction Id
  return row.id
}

export interface IDataColumn<T> {
  name: keyof T
  title: string
  formatter?: (value: SnapshotIn<typeof Transaction>) => string
}

export interface IDataTable<TData> {
  columns: IDataColumn<TData>[]
  transactions: Map<string, ITransactionInstance> // ! This is some special mobx!
}

export const TransactionDataTable = observer(({ transactions, columns }: IDataTable<any>) => {
  // TODO: Still more to bust to make this more configurable.
  const rows = keys(transactions).map((key) => {
    return transactions.get(key as string)?.formattedValue ?? {}
  })

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ]
    }
    if (changed) {
      changedRows = rows.map((row) => (changed[row.id] ? { ...row, ...changed[row.id] } : row))
    }
    if (deleted) {
      const deletedSet = new Set(deleted)
      changedRows = rows.filter((row) => !deletedSet.has(row.id))
    }
  }

  return (
    <Paper>
      <Grid rows={rows} columns={columns as Column[]} getRowId={getRowId}>
        <EditingState onCommitChanges={commitChanges} />
        <Table />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
      </Grid>
    </Paper>
  )
})