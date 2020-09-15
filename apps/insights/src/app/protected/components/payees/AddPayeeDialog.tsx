import { ICreatePayee } from '@mammoth/api-interfaces'
import { Button } from '@mammoth/insights-ui'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import React, { ChangeEvent, useState } from 'react'
import { useBudgetStore } from '../../hooks'

interface IAddPayeeDialogProps {
  onClose: (accountDetails: ICreatePayee | null) => void
  isOpen: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let key: keyof ICreatePayee

export const AddPayeeDialog: React.FC<IAddPayeeDialogProps> = ({
  onClose,
  isOpen,
}): JSX.Element => {
  const budgetStore = useBudgetStore()
  const [details, setDetails] = useState<ICreatePayee>({
    name: '',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    budgetId: budgetStore.selectedBudget!.id,
  })

  const onChange = (event: ChangeEvent<any>) => {
    const { target } = event
    const { name, value } = target
    setDetails({ ...details, [name]: value })
  }

  const onButtonClick = () => {
    onClose(details)
  }

  const handleClose = () => {
    onClose(null)
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={isOpen}>
      <DialogTitle id="dialog-title">Add Payee</DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'column', margin: '1rem' }}>
        <TextField
          label={'Payee Name'}
          name={(key = 'name')}
          value={details.name}
          onChange={onChange}
          style={{ marginTop: '0.5rem' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onButtonClick}>Save Payee</Button>
      </DialogActions>
    </Dialog>
  )
}
