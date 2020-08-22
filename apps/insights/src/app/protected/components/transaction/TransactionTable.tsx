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
import { ITransactionDisplayRecord } from '../../interface'
import { ITransactionInstance, Transaction } from '../../models'

const getRowId = (row: ITransactionDisplayRecord) => {
  return row.id
}

export interface ITransactionTableRecord {}

export interface IDataColumn<T> {
  name: keyof T
  title: string
  formatter?: (value: SnapshotIn<typeof Transaction>) => string
}

export interface IDataTable<TData> {
  columns: IDataColumn<TData>[]
  transactions: Map<string, ITransactionInstance>
  filter?: (item: ITransactionInstance) => boolean
}

export const TransactionDataTable = observer(
  ({ transactions, columns, filter }: IDataTable<any>) => {
    const rows: ITransactionDisplayRecord[] = []
    keys(transactions).forEach((key) => {
      const transaction = transactions.get(key as string)
      if (transaction && (filter?.(transaction) ?? true)) {
        rows.push(transaction.formattedValue)
      }
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
          <TableEditColumn
            // cellComponent={() => <div>this is the cell row button area</div>} // this will change the ADD/EDIT components look
            // headerCellComponent={() => <div>this is the add button</div>}
            showAddCommand
            showEditCommand
            showDeleteCommand
          />
        </Grid>
      </Paper>
    )
  }
)
