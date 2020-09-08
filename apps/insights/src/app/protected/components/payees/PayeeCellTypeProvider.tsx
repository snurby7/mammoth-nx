import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { IFormattedNode, ITransactionDetail } from '@mammoth/api-interfaces'
import { TextField } from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import React, { useCallback, useState } from 'react'
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

  const onChange = useCallback(
    (payee: IPayeeSnap | null) => {
      onValueChange(payee?.id)
      setSelectedPayee(payee)
    },
    [onValueChange]
  )

  const onAutoCompleteSelection = (payee: IPayeeSnap | string) => {
    if (typeof payee === 'string' || payee.id === '') {
      // create the payee and set the selectedPayee to the server payee
      let payeeName = typeof payee === 'string' ? payee : payee.name
      payeeName =
        payeeName.charAt(payeeName.length - 1) === '"' ? payeeName.slice(0, -1) : payeeName
      // * Two cases come in here one that looks like 'Create "Payee A"' and one that looks like 'Payee A'

      payeeStore
        .createPayee({
          name: payeeName.replace('Create "', ''),
          budgetId: selectedBudget!.id,
        })
        .then((payee) => {
          onChange(payee)
        })
    } else {
      onChange(payee)
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
          onChange(newValue)
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
