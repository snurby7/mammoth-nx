import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { IFormattedNode, IPayee } from '@mammoth/api-interfaces'
import { TextField } from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import React, { useCallback, useState } from 'react'
import { map } from 'rxjs/operators'
import { useObservable } from '../../../hooks'
import { ITransactionGridRow } from '../../../interface'
import { useBudgetStore, usePayeeStore } from '../../hooks'
import { IPayeeSnap } from '../../models'
import { rxPayeeApi } from '../../models/payee'

const filter = createFilterOptions<IPayeeSnap>()

const PayeeCellFormatter = ({ value: node }: { value: IFormattedNode }) => {
  return <span>{node.value}</span>
}

const PayeeCellEditor = ({ value, onValueChange }) => {
  const payeeId: string | undefined = value // when it's add mode this is undefined

  const payeeStore = usePayeeStore()
  const { result: payeeList } = useObservable(
    rxPayeeApi.payeeIdList$.pipe(
      map((payeeIds) => payeeIds.map((payeeId) => rxPayeeApi.getPayee(payeeId).detailRef))
    ),
    []
  )
  const { selectedBudget } = useBudgetStore()
  const [selectedPayee, setSelectedPayee] = useState<IPayee | null>(
    payeeId ? rxPayeeApi.getPayee(payeeId).detailRef : null
  )

  const onChange = useCallback(
    (payee: IPayee | null) => {
      onValueChange(payee?.id)
      setSelectedPayee(payee)
    },
    [onValueChange]
  )

  const onAutoCompleteSelection = (payee: IPayee | string) => {
    if (typeof payee === 'string' || payee.id === '') {
      // create the payee and set the selectedPayee to the server payee
      let payeeName = typeof payee === 'string' ? payee : payee.name
      payeeName =
        payeeName.charAt(payeeName.length - 1) === '"' ? payeeName.slice(0, -1) : payeeName
      // * Two cases come in here one that looks like 'Create "Payee A"' and one that looks like 'Payee A'

      rxPayeeApi
        .createPayee({
          name: payeeName.replace('Create "', ''),
          budgetId: selectedBudget!.id,
        })
        .then((payee) => {
          onChange(payee.detailRef)
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
let detailKey: keyof ITransactionGridRow

export const PayeeCellTypeProvider = () => {
  return (
    <DataTypeProvider
      for={[(detailKey = 'payeeId')]}
      formatterComponent={PayeeCellFormatter}
      editorComponent={PayeeCellEditor}
    />
  )
}
