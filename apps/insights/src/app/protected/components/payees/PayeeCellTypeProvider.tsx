import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { IFormattedNode, ITransactionDetail } from '@mammoth/api-interfaces'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React, { useState } from 'react'
import { usePayeeStore } from '../../hooks'

const PayeeCellFormatter = ({ value: node }: { value: IFormattedNode }) => {
  return <span>{node.value}</span>
}

// TODO: Need to be able to create AND save a payee from the list (in case I don't have it in the budget)

const PayeeCellEditor = ({ value, onValueChange }) => {
  const node: IFormattedNode = value ?? { id: '', value: '' } // when it's add mode this is undefined
  const { payees } = usePayeeStore()
  const payeeList = Array.from(payees.values())
  const [selectedPayeeId, setSelectedPayeeId] = useState(
    payeeList.find((payee) => payee.id === node.id)
  )
  // const onChange = (
  //   event: React.ChangeEvent<{
  //     name?: string | undefined
  //     value: unknown
  //   }>
  // ) => {
  //   const value = event.target.value as string
  //   // setSelectedPayeeId(value)
  //   // onValueChange(value)
  // }

  return (
    <Autocomplete
      id="payee-cell"
      value={selectedPayeeId}
      options={Array.from(payees.values())}
      getOptionLabel={(option) => option.name}
      onInputChange={(event, newInput) => {
        console.log(event, newInput)
      }}
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />
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
