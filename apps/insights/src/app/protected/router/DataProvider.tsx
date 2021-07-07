import { observer } from 'mobx-react'
import { Instance } from 'mobx-state-tree'
import React, { useEffect } from 'react'
import { useAccountStore, useCategoryStore, usePayeeStore } from '../hooks'
import { Budget } from '../models'
import { rxAccountApi } from '../models/account'
import { rxCategoryApi } from '../models/category'
import { rxPayeeApi } from '../models/payee'

interface IDataProviderProps {
  selectedBudget?: Instance<typeof Budget>
}
export const DataProvider: React.FC<IDataProviderProps> = observer(
  ({ selectedBudget, children }): JSX.Element => {
    const categoryStore = useCategoryStore()
    const payeeStore = usePayeeStore()
    const accountStore = useAccountStore()

    useEffect(() => {
      if (selectedBudget) {
        rxCategoryApi.loadCategories(selectedBudget.id)
        rxPayeeApi.loadPayees(selectedBudget.id)
        rxAccountApi.loadAccounts(selectedBudget.id)
      }
    }, [accountStore, categoryStore, payeeStore, selectedBudget])
    return <div>{children}</div>
  }
)
