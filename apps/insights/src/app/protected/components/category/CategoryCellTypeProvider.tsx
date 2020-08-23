import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { IFormattedNode, ITransactionDetail } from '@mammoth/api-interfaces'
import { Input, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { useCategoryStore } from '../../hooks'
import { ICategoryInstance } from '../../models'

const CategoryCellFormatter = ({ value: node }: { value: IFormattedNode }) => {
  return <span>{node.value}</span>
}
const CategoryCellEditor = ({ value, onValueChange }) => {
  const node: IFormattedNode = value ?? { id: '', value: '' } // when it's add mode this is undefined
  const { categories } = useCategoryStore()
  return (
    <Select
      input={<Input />}
      value={node.id}
      onChange={(event) => onValueChange(event.target.value)}
      style={{ width: '100%' }}
    >
      {Array.from(categories.values()).map((category: ICategoryInstance) => (
        <MenuItem key={category.id} value={category.id}>
          {category.name}
        </MenuItem>
      ))}
    </Select>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let detailKey: keyof ITransactionDetail

export const CategoryCellTypeProvider = () => {
  return (
    <DataTypeProvider
      for={[(detailKey = 'category')]}
      formatterComponent={CategoryCellFormatter}
      editorComponent={CategoryCellEditor}
    />
  )
}
