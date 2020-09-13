import { applySnapshot, Instance, ModelSnapshotType, onSnapshot, types } from 'mobx-state-tree'
import { AccountStore } from './Account.model'
import { BudgetStore } from './Budget.model'
import { CategoryStore } from './Category.model'
import { PayeeStore } from './Payee.model'
import { TransactionStore } from './TransactionStore.model'

export const RootModel = types.model('RootStore', {
  budgetStore: BudgetStore,
  accountStore: AccountStore,
  transactionStore: TransactionStore,
  categoryStore: CategoryStore,
  payeeStore: PayeeStore,
})

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IRootModelInstance extends Instance<typeof RootModel> {
  accountStore: Instance<typeof AccountStore>
  budgetStore: Instance<typeof BudgetStore>
  categoryStore: Instance<typeof CategoryStore>
  payeeStore: Instance<typeof PayeeStore>
  transactionStore: Instance<typeof TransactionStore>
}

export const rootStore = RootModel.create({
  budgetStore: {
    budgets: {},
    isLoading: false,
  },
  accountStore: {
    accounts: {},
    isLoading: false,
  },
  transactionStore: {
    transactions: {},
  },
  categoryStore: {
    categories: {},
    isLoading: false,
  },
  payeeStore: {
    payees: {},
    isLoading: false,
  },
})

onSnapshot(rootStore, (snapshot: ModelSnapshotType<{}>) => {
  // console.log('new snapshot ----->', snapshot)
  sessionStorage.setItem('mammoth-snapshot', JSON.stringify(snapshot))
})

const previousSnapshot = sessionStorage.getItem('mammoth-snapshot')
if (previousSnapshot) {
  try {
    applySnapshot(rootStore, JSON.parse(previousSnapshot))
  } catch (err) {
    console.log('Error applying snapshot', err)
  }
}
