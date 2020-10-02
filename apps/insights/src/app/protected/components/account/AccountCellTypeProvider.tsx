import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { Input, MenuItem, Select } from '@material-ui/core'
import React, { useState } from 'react'
import { map, skipWhile } from 'rxjs/operators'
import { useObservable } from '../../../hooks'
import { ITransactionGridRow } from '../../../interface'
import { rxAccountApi } from '../../models/account'

type CellGridView = { value: string }
const AccountCellFormatter = ({ value }: CellGridView) => {
  const { result: accountName } = useObservable(
    rxAccountApi.accountIdList$.pipe(
      skipWhile((accountIdList) => !accountIdList.some((accountId) => accountId === value)),
      map(() => rxAccountApi.getAccount(value).displayValue)
    ),
    ''
  )
  return <span>{accountName}</span>
}

const AccountCellEditor = ({ value, onValueChange }) => {
  console.log('AccountCellEditor')
  const accountId: string | undefined = value // when it's add mode this is undefined
  const [selectedAccountId, setSelectedAccountId] = useState(accountId)
  const { result: accounts } = useObservable(
    rxAccountApi.accountIdList$.pipe(
      map((accountIdList) => accountIdList.map((accountId) => rxAccountApi.getAccount(accountId)))
    ),
    []
  )
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
      {accounts.map(({ detailRef: account }) => (
        <MenuItem key={account.id} value={account.id}>
          {account.name}
        </MenuItem>
      ))}
    </Select>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let detailKey: keyof ITransactionGridRow

export const AccountCellTypeProvider = () => {
  console.log('AccountCellType')
  return (
    <DataTypeProvider
      for={[(detailKey = 'accountId')]}
      formatterComponent={AccountCellFormatter}
      editorComponent={AccountCellEditor}
    />
  )
}
