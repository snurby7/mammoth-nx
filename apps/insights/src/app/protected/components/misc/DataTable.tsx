import { EditingState } from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableEditColumn,
  TableEditRow,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'
import Paper from '@material-ui/core/Paper'
import React, { useState } from 'react'
import { defaultColumnValues, generateRows } from './temp/generator'

const getRowId = (row) => row.id

interface IDataColumn<T> {
  name: keyof T
  title: string
}

interface IDataTable<TData> {
  columns: IDataColumn<TData>[]
  rows: TData[]
}

export const DataTable = (props: IDataTable<any>) => {
  // TODO: Going to bust this apart and make it more configurable.
  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ])
  const [rows, setRows] = useState<any>(
    generateRows({
      columnValues: { ...defaultColumnValues, id: ({ index }: { index: number }) => index },
      length: 8,
    })
  )
  console.log(rows)

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
    setRows(changedRows)
  }

  return (
    <Paper>
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <EditingState onCommitChanges={commitChanges} />
        <Table />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
      </Grid>
    </Paper>
  )
}
