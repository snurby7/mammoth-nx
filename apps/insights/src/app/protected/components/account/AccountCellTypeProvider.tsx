import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { Input, MenuItem, Select } from '@material-ui/core'
import React, { useState } from 'react'
import { map } from 'rxjs/operators'
import { useObservable } from '../../../hooks'
import { ITransactionGridRow } from '../../../interface'
import { rxAccountApi } from '../../models/account'

const AccountCellFormatter = ({ value }) => {
  console.log('Account => ', value)
  // TODO This never gets called for some reason.
  return <span> Waffles</span>
}
const AccountCellEditor = ({ value, onValueChange }) => {
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
  return (
    <DataTypeProvider
      for={[(detailKey = 'accountId')]}
      formatterComponent={AccountCellFormatter}
      editorComponent={AccountCellEditor}
    />
  )
}
