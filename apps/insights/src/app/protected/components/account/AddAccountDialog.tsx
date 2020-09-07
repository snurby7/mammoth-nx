import { ICreateAccount, SupportedAccountType } from '@mammoth/api-interfaces'
import { Button } from '@mammoth/insights-ui'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import React, { ChangeEvent, useState } from 'react'
import { useBudgetStore } from '../../hooks'

interface IAddAccountDialogProps {
  onClose: (accountDetails: ICreateAccount | null) => void
  isOpen: boolean
}

let key: keyof ICreateAccount

export const AddAccountDialog: React.FC<IAddAccountDialogProps> = ({
  onClose,
  isOpen,
}): JSX.Element => {
  const budgetStore = useBudgetStore()
  const [details, setDetails] = useState<ICreateAccount>({
    name: '',
    type: SupportedAccountType.Checking,
    balance: 0,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    budgetId: budgetStore.selectedBudget!.id,
  })

  const onChange = (event: ChangeEvent<any>) => {
    const { target } = event
    const { name, value } = target
    setDetails({ ...details, [name]: name !== (key = 'balance') ? value : +value })
  }

  const onButtonClick = () => {
    onClose(details)
  }

  const handleClose = () => {
    onClose(null)
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={isOpen}>
      <DialogTitle id="dialog-title">Add Account</DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'column', margin: '1rem' }}>
        <TextField
          label={'Account Name'}
          name={(key = 'name')}
          value={details.name}
          onChange={onChange}
          style={{ marginTop: '0.5rem' }}
        />
        <Select
          name={(key = 'type')}
          input={<Input />}
          value={details.type}
          onChange={onChange}
          style={{ margin: '1rem 0' }}
        >
          {Object.values(SupportedAccountType).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label={'Starting Balance'}
          name={(key = 'balance')}
          type="number"
          value={details.balance}
          onChange={onChange}
          style={{ marginBottom: '0.5rem' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onButtonClick}>Save Account</Button>
      </DialogActions>
    </Dialog>
  )
}
