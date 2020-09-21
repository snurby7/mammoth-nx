import { CustomTreeData, TreeDataState } from '@devexpress/dx-react-grid'
import { Grid, Table, TableHeaderRow, TableTreeColumn } from '@devexpress/dx-react-grid-material-ui'
import { Paper } from '@material-ui/core'
import React, { useState } from 'react'

const getChildRows = (row, rootRows) => (row ? row.items : rootRows)

export const CategoryBreakdownPage = () => {
  // TODO Feed this actual data for categories to consume and display.

  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ])

  const [tableColumnExtensions] = useState([{ columnName: 'name', width: 300 }])

  return (
    <Paper>
      <Grid rows={[]} columns={columns}>
        <TreeDataState />
        <CustomTreeData getChildRows={getChildRows} />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableTreeColumn for="name" />
      </Grid>
    </Paper>
  )
}
