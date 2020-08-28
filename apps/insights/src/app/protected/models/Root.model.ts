import { applySnapshot, ModelSnapshotType, onSnapshot, types } from 'mobx-state-tree'
import { AccountStore } from './Account.model'
import { BudgetStore } from './Budget.model'
import { CategoryStore } from './Category.model'
import { PayeeStore } from './Payee.model'
import { TransactionStore } from './Transaction.model'

export const RootModel = types.model({
  budgetStore: BudgetStore,
  accountStore: AccountStore,
  transactionStore: TransactionStore,
  categoryStore: CategoryStore,
  payeeStore: PayeeStore,
})

export const rootStore = RootModel.create({
  budgetStore: {
    budgets: [],
    isLoading: false,
  },
  accountStore: {
    accounts: [],
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
    payee: {},
    isLoading: false,
  },
})

const states: ModelSnapshotType<{}>[] = []
let currentFrame = -1

onSnapshot(rootStore, (snapshot: any) => {
  if (currentFrame === states.length - 1) {
    currentFrame++
    // disabling for a cleaner log
    // console.log('new snapshot ----->', snapshot)
    // states.push(snapshot)
    sessionStorage.setItem('mammoth-snapshot', JSON.stringify(snapshot))
  }
})
const previousSnapshot = sessionStorage.getItem('mammoth-snapshot')
if (previousSnapshot) {
  try {
    applySnapshot(rootStore, JSON.parse(previousSnapshot))
  } catch (err) {
    console.log('Error applying snapshot', err)
  }
}
