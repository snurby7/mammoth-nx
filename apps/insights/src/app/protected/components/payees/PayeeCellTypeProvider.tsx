import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { IFormattedNode, ITransactionDetail } from '@mammoth/api-interfaces'
import { TextField } from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import React, { useState } from 'react'
import { useBudgetStore, usePayeeStore } from '../../hooks'
import { IPayeeSnap } from '../../models'

const filter = createFilterOptions<IPayeeSnap>()

const PayeeCellFormatter = ({ value: node }: { value: IFormattedNode }) => {
  return <span>{node.value}</span>
}

const PayeeCellEditor = ({ value, onValueChange }) => {
  const node: IFormattedNode = value ?? { id: '', value: '' } // when it's add mode this is undefined
  const payeeStore = usePayeeStore()
  const payeeList: IPayeeSnap[] = Array.from(payeeStore.payees.values())
  const { selectedBudget } = useBudgetStore()
  const [selectedPayee, setSelectedPayee] = useState<IPayeeSnap | null>(
    payeeList.find((payee) => payee.id === node.id) ?? null
  )

  const onAutoCompleteSelection = (payee: IPayeeSnap | string) => {
    if (typeof payee === 'string' || payee.id === '') {
      // create the payee and set the selectedPayee to the server payee
      const payeeName = typeof payee === 'string' ? payee : payee.name
      payeeStore
        .createPayee({
          // remove the create part and remove the last quote.
          name: payeeName.replace('Create "', '').slice(0, -1),
          budgetId: selectedBudget!.id,
        })
        .then((payee) => {
          console.log('create payee', payee)
          setSelectedPayee(payee)
          onValueChange(payee.id)
        })

      // create this payee
    } else {
      setSelectedPayee(payee)
      onValueChange(payee.id)
    }
  }

  return (
    <Autocomplete
      id="payee-cell"
      value={selectedPayee}
      options={payeeList}
      getOptionLabel={(option: IPayeeSnap) => option.name}
      onChange={(_, newValue) => {
        if (typeof newValue === 'string') {
          onAutoCompleteSelection(newValue)
        } else if (newValue && newValue.id === '') {
          onAutoCompleteSelection(newValue)
        } else {
          setSelectedPayee(newValue)
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)
        if (params.inputValue !== '') {
          filtered.push({
            id: '',
            name: `Create "${params.inputValue}"`,
            budgetId: '',
          })
        }
        return filtered
      }}
      freeSolo
      selectOnFocus
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
