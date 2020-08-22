import { applySnapshot, ModelSnapshotType, onSnapshot, types } from 'mobx-state-tree'
import { AccountStore } from './Account.model'
import { BudgetStore } from './Budget.model'
import { TransactionStore } from './Transaction.model'

export const RootModel = types.model({
  budgetStore: BudgetStore,
  accountStore: AccountStore,
  transactionStore: TransactionStore,
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
})

const states: ModelSnapshotType<{}>[] = []
let currentFrame = -1

onSnapshot(rootStore, (snapshot: any) => {
  if (currentFrame === states.length - 1) {
    currentFrame++
    console.log('new snapshot ----->', snapshot)
    states.push(snapshot)
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
