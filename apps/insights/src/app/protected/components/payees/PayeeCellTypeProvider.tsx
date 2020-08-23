import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { IFormattedNode, ITransactionDetail } from '@mammoth/api-interfaces'
import { Input, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { usePayeeStore } from '../../hooks'

const PayeeCellFormatter = ({ value: node }: { value: IFormattedNode }) => {
  return <span>{node.value}</span>
}
const PayeeCellEditor = ({ value, onValueChange }) => {
  const node: IFormattedNode = value ?? { id: '', value: '' } // when it's add mode this is undefined
  const { payees } = usePayeeStore()
  return (
    <Select
      input={<Input />}
      value={node.id}
      onChange={(event) => onValueChange(event.target.value)}
      style={{ width: '100%' }}
    >
      {Array.from(payees.values()).map((payee) => (
        <MenuItem key={payee.id} value={payee.id}>
          {payee.name}
        </MenuItem>
      ))}
    </Select>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let detailKey: keyof ITransactionDetail

export const PayeeCellTypeProvider = () => {
  return (
    <DataTypeProvider
      for={[(detailKey = 'payee')]}
      formatterComponent={PayeeCellFormatter}
      editorComponent={PayeeCellEditor}
    />
  )
}
