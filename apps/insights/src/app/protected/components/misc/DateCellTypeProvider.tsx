import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { ITransactionDetail } from '@mammoth/api-interfaces'
import { TextField } from '@material-ui/core'
import { LocalizationProvider, MobileDatePicker } from '@material-ui/pickers'
import MomentAdapter from '@material-ui/pickers/adapter/moment'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { formatter, parser } from '../../../utils'

const DateCellFormatter = ({ value }) => {
  return <span>{formatter.date(value)}</span>
}
const DateCellEditor = ({ value: cellValue, onValueChange }) => {
  const [value, setValue] = useState<Date | null>(parser.date(cellValue) || new Date())
  useEffect(() => {
    onValueChange(formatter.utcFormat(value ?? undefined))
    // ! This is effectively a useEffectOnce, I just want to get the initial value there.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChange = (newValue: Date | null) => {
    if (!newValue) {
      setValue(null)
      return
    }
    onValueChange(formatter.utcFormat(newValue))
    setValue(newValue)
  }

  return (
    <LocalizationProvider dateLibInstance={moment} dateAdapter={MomentAdapter} locale={'us'}>
      <MobileDatePicker
        value={value}
        onChange={onChange}
        renderInput={(props) => <TextField {...props} />}
      />
    </LocalizationProvider>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let detailKey: keyof ITransactionDetail

export const DateCellTypeProvider = () => {
  return (
    <DataTypeProvider
      for={[(detailKey = 'date')]}
      formatterComponent={DateCellFormatter}
      editorComponent={DateCellEditor}
    />
  )
}
