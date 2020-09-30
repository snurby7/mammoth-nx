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
import React, { useState } from 'react'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { useObservable } from '../../../hooks'
import { ITransactionGridRow } from '../../../interface'
import { useBudgetStore } from '../../hooks'
import { rxTransactionApi, Transaction } from '../../models/transaction'
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
}

export interface IColumnExtension<TData> {
  columnName: keyof TData
  width: string | number
}

export interface IDataTable<TData> {
  columns: IDataColumn<TData>[]
  columnExtensions?: IColumnExtension<TData>[]
  transactions$: Observable<Transaction[]>
  hideControls?: boolean
}

export const TransactionDataTable: React.FC<IDataTable<any>> = ({
  transactions$,
  columns,
  columnExtensions,
  hideControls,
}) => {
  const [errors, setErrors] = useState<Record<string, any>>({})
  const budgetStore = useBudgetStore()
  const selectedBudget = budgetStore.selectedBudget

  const { result: rows } = useObservable(
    transactions$.pipe(
      map((transactions) => transactions.map((transaction) => transaction.toGridView()))
    ),
    []
  )
  console.log('TransactionTable Rows => ', rows)

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

  const commitChanges = ({ added, changed, deleted }: ChangeSet) => {
    if (added) {
      rxTransactionApi.createTransaction(selectedBudget.id, added as ITransactionGridRow[])
    }
    if (changed) {
      rxTransactionApi.updateTransactions(changed as Record<string, ITransactionDetail>)
    }
    if (deleted) {
      rxTransactionApi.deleteTransactions(deleted as string[])
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
        {!hideControls && (
          <TableEditColumn
            showAddCommand
            showEditCommand
            showDeleteCommand
            cellComponent={(props) => (
              <EditCell {...props} errors={errors} requiredTransactionFields={requiredColumnKeys} />
            )}
          />
        )}
      </Grid>
    </Paper>
  )
}
