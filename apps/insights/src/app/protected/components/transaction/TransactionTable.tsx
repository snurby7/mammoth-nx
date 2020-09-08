import {
  ChangeSet,
  Column,
  EditingState,
  IntegratedSorting,
  Sorting,
  SortingState,
} from '@devexpress/dx-react-grid'
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
import { ITransactionGridRow } from '../../../interface'
import { useBudgetStore, useTransactionStore } from '../../hooks'
import { ITransactionInstance, Transaction } from '../../models'
import { AccountCellTypeProvider } from '../account'
import { CategoryCellTypeProvider } from '../category'
import { CurrencyCellTypeProvider, DateCellTypeProvider } from '../misc'
import { PayeeCellTypeProvider } from '../payees'

const getRowId = (row: ITransactionDetail): string => row.id

const EditCell = ({ errors, requiredTransactionFields, ...props }) => {
  const { children } = props
  const anyProps: any = props
  const rowData = props.tableRow.row
  const hasAllRequiredFields = requiredTransactionFields.every(
    (requiredField) => !!rowData[requiredField]
  )

  return (
    <TableEditColumn.Cell {...anyProps}>
      {React.Children.map(children, (child) => {
        let disabled = errors[props.tableRow.rowId]
        // * A little weird here, but it's a step and it makes the required things be filled in.
        // * Will eventually format the cell to make it show as red or something
        if (child?.props.id === 'commit' && child?.props.text === 'Save') {
          disabled = !hasAllRequiredFields
        }
        return child?.props.id === 'commit'
          ? React.cloneElement(child, {
              disabled,
            })
          : child
      })}
    </TableEditColumn.Cell>
  )
}

export interface IDataColumn<T> {
  name: keyof T
  title: string
  isRequired: boolean
  formatter?: (value: SnapshotIn<typeof Transaction>) => string
}

export interface IColumnExtension<TData> {
  columnName: keyof TData
  width: string | number
}

export interface IDataTable<TData> {
  columns: IDataColumn<TData>[]
  columnExtensions?: IColumnExtension<TData>[]
  transactions: Map<string, ITransactionInstance>
  filter?: (item: ITransactionInstance) => boolean
}

export const TransactionDataTable: React.FC<IDataTable<any>> = observer(
  ({ transactions, columns, columnExtensions, filter }) => {
    const [errors, setErrors] = useState<Record<string, any>>({})
    const transactionStore = useTransactionStore()
    const budgetStore = useBudgetStore()
    const selectedBudget = budgetStore.selectedBudget

    const [sorting, setSorting] = useState<Sorting[]>([{ columnName: 'date', direction: 'desc' }])

    if (!selectedBudget) {
      return <div>There is no selected budget! Sorry!</div>
    }

    const requiredColumnKeys: string[] = columns.reduce((accumulator, item) => {
      if (item.isRequired) {
        accumulator.push(item.name as string)
      }
      return accumulator
    }, [] as string[])
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
        transactionStore.createTransactions(selectedBudget.id, added as ITransactionGridRow[])
      }
      if (changed) {
        transactionStore.updateTransactions(changed as Record<string, ITransactionDetail>)
      }
      if (deleted) {
        transactionStore.deleteTransactions(deleted as string[])
      }
    }

    const validate = (rows: ITransactionDetail[], columns: IDataColumn<any>[]) => {
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
          <SortingState sorting={sorting} onSortingChange={setSorting} />
          <IntegratedSorting />
          {/* Custom Cells these could probably be abstracted to {children} later */}
          <AccountCellTypeProvider />
          <PayeeCellTypeProvider />
          <CategoryCellTypeProvider />
          <DateCellTypeProvider />
          <CurrencyCellTypeProvider />
          {/* End custom cells */}
          <EditingState onRowChangesChange={onEdited} onCommitChanges={commitChanges} />
          <Table
            columnExtensions={
              columnExtensions?.map(({ columnName, width }) => ({
                columnName: columnName as string, // a little type manipulation.
                width,
              })) ?? []
            }
          />
          <TableHeaderRow showSortingControls />
          <TableEditRow />
          <TableEditColumn
            // cellComponent={() => <div>this is the cell row button area</div>} // this will change the ADD/EDIT components look
            // headerCellComponent={() => <div>this is the add button</div>}
            showAddCommand
            showEditCommand
            showDeleteCommand
            cellComponent={(props) => (
              <EditCell {...props} errors={errors} requiredTransactionFields={requiredColumnKeys} />
            )}
          />
        </Grid>
      </Paper>
    )
  }
)
