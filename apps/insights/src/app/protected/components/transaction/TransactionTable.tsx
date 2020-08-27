import { ChangeSet, Column, EditingState } from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableEditColumn,
  TableEditRow,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'
import { ITransactionDetail } from '@mammoth/api-interfaces'
import Paper from '@material-ui/core/Paper'
import { observer } from 'mobx-react'
import { SnapshotIn } from 'mobx-state-tree'
import React, { useState } from 'react'
import { useTransactionStore } from '../../hooks'
import { ITransactionInstance, Transaction } from '../../models'
import { AccountCellTypeProvider } from '../account'
import { CategoryCellTypeProvider } from '../category'
import { CurrencyCellTypeProvider, DateCellTypeProvider } from '../misc'
import { PayeeCellTypeProvider } from '../payees'

const getRowId = (row: ITransactionDetail): string => row.id

const EditCell = ({ errors, ...props }) => {
  const { children } = props
  const anyProps: any = props
  return (
    <TableEditColumn.Cell {...anyProps}>
      {React.Children.map(children, (child) =>
        child?.props.id === 'commit'
          ? React.cloneElement(child, {
              disabled: errors[props.tableRow.rowId],
            })
          : child
      )}
    </TableEditColumn.Cell>
  )
}

export interface IDataColumn<T> {
  name: keyof T
  title: string
  isRequired: boolean
  formatter?: (value: SnapshotIn<typeof Transaction>) => string
}

export interface IDataTable<TData> {
  columns: IDataColumn<TData>[]
  transactions: Map<string, ITransactionInstance>
  filter?: (item: ITransactionInstance) => boolean
}

export const TransactionDataTable: React.FC<IDataTable<any>> = observer(
  ({ transactions, columns, filter }) => {
    const transactionStore = useTransactionStore()
    const [errors, setErrors] = useState<Record<string, any>>({})

    const rows: ITransactionDetail[] = []
    Array.from(transactions.values()).forEach((transaction) => {
      const formattedValue = transaction.formattedValue
      // TODO: Give this a good hard stare, this seems like it could be easier
      if (!filter) {
        rows.push(formattedValue)
      } else if (filter(transaction)) {
        rows.push(formattedValue)
      }
    })

    const commitChanges = ({ added, changed, deleted }: ChangeSet) => {
      if (added) {
        transactionStore.createTransactions(added as ITransactionDetail[])
      }
      if (changed) {
        transactionStore.updateTransactions(changed as Record<string, ITransactionDetail>)
      }
      if (deleted) {
        transactionStore.deleteTransactions(deleted as string[])
      }
    }

    const validate = (rows: ITransactionDetail[], columns: IDataColumn<any>[]) => {
      console.log('rows', rows)
      console.log('columns', columns)
      return Object.entries(rows).reduce(
        (acc, [rowId, row]) => ({
          ...acc,
          [rowId]: columns.some((column) => column.isRequired && row[column.name] === ''),
        }),
        {}
      )
    }

    const onEdited = (edited) => setErrors(validate(edited, columns))

    return (
      <Paper>
        <Grid rows={rows} columns={columns as Column[]} getRowId={getRowId}>
          {/* Custom Cells these could probably be abstracted to {children} later */}
          <AccountCellTypeProvider />
          <PayeeCellTypeProvider />
          <CategoryCellTypeProvider />
          <DateCellTypeProvider />
          <CurrencyCellTypeProvider />
          {/* End custom cells */}
          <EditingState onRowChangesChange={onEdited} onCommitChanges={commitChanges} />

          <Table />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn
            // cellComponent={() => <div>this is the cell row button area</div>} // this will change the ADD/EDIT components look
            // headerCellComponent={() => <div>this is the add button</div>}
            showAddCommand
            showEditCommand
            showDeleteCommand
            cellComponent={(props) => <EditCell {...props} errors={errors} />}
          />
        </Grid>
      </Paper>
    )
  }
)
