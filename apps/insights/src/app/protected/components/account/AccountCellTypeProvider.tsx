import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { IFormattedNode, ITransactionDetail } from '@mammoth/api-interfaces'
import { Input, MenuItem, Select } from '@material-ui/core'
import React, { useState } from 'react'
import { useAccountStore } from '../../hooks'

const AccountCellFormatter = ({ value: node }: { value: IFormattedNode }) => {
  return <span>{node.value}</span>
}
const AccountCellEditor = ({ value, onValueChange }) => {
  const node: IFormattedNode = value ?? { id: '', value: '' } // when it's add mode this is undefined
  const [selectedAccountId, setSelectedAccountId] = useState(node.id)
  const { accounts } = useAccountStore()
  const onChange = (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    const value = event.target.value as string
    setSelectedAccountId(value)
    onValueChange(value)
  }

  return (
    <Select
      input={<Input />}
      value={selectedAccountId}
      onChange={onChange}
      style={{ width: '100%' }}
    >
      {accounts.map((account) => (
        <MenuItem key={account.id} value={account.id}>
          {account.name}
        </MenuItem>
      ))}
    </Select>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let detailKey: keyof ITransactionDetail

export const AccountCellTypeProvider = () => {
  return (
    <DataTypeProvider
      for={[(detailKey = 'account')]}
      formatterComponent={AccountCellFormatter}
      editorComponent={AccountCellEditor}
    />
  )
}
