import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { ITransactionDetail } from '@mammoth/api-interfaces'
import { TextField } from '@material-ui/core'
import { DatePicker, LocalizationProvider } from '@material-ui/pickers'
import MomentAdapter from '@material-ui/pickers/adapter/moment'
import moment from 'moment'
import React from 'react'
import { formatter } from '../../../utils'

const DateCellFormatter = ({ value }) => {
  return <span>{formatter.date(value)}</span>
}
const DateCellEditor = ({ value: cellValue, onValueChange }) => {
  // const [date, setDate] = useState(new Date(value ?? ''))
  const [value, setValue] = React.useState<Date | null>(new Date(cellValue ?? ''))

  return (
    <LocalizationProvider dateLibInstance={moment} dateAdapter={MomentAdapter} locale={'us'}>
      <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => setValue(newValue)}
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
