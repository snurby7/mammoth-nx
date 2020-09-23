import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { Input } from '@material-ui/core'
import React, { ChangeEvent, useState } from 'react'
import { ITransactionGridRow } from '../../../interface'
import { formatter } from '../../../utils'

const CurrencyCellFormatter = ({ value }) => {
  return <span>{value !== 0 ? formatter.currency(value) : ''}</span>
}
const CurrencyCellEditor = ({ value: cellValue, onValueChange }) => {
  const [value, setValue] = useState<string | null>(cellValue)

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value
    onValueChange(+newValue) // parseInt shorthand, somehow the server doesn't block this...
    setValue(newValue)
  }

  return <Input value={value} onChange={onChange} />
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let detailKey: keyof ITransactionGridRow

export const CurrencyCellTypeProvider = () => {
  return (
    <DataTypeProvider
      for={[(detailKey = 'outflow'), (detailKey = 'inflow')]}
      formatterComponent={CurrencyCellFormatter}
      editorComponent={CurrencyCellEditor}
    />
  )
}
