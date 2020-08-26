import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { IFormattedNode, ITransactionDetail } from '@mammoth/api-interfaces'
import { Input, MenuItem, Select } from '@material-ui/core'
import React, { useState } from 'react'
import { usePayeeStore } from '../../hooks'

const PayeeCellFormatter = ({ value: node }: { value: IFormattedNode }) => {
  return <span>{node.value}</span>
}
const PayeeCellEditor = ({ value, onValueChange }) => {
  const node: IFormattedNode = value ?? { id: '', value: '' } // when it's add mode this is undefined
  const { payees } = usePayeeStore()
  const [selectedPayeeId, setSelectedPayeeId] = useState(node.id)
  const onChange = (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    const value = event.target.value as string
    setSelectedPayeeId(value)
    onValueChange(value)
  }
  return (
    <Select input={<Input />} value={selectedPayeeId} onChange={onChange} style={{ width: '100%' }}>
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
