import { IPayee } from '@mammoth/api-interfaces'
import { flow, getParent, Instance, SnapshotIn, types } from 'mobx-state-tree'
import { payeeApi } from '../api'
import { RootModel } from './Root.model'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let key: keyof IPayee
export const Payee = types
  .model({
    [(key = 'id')]: types.identifier,
    [(key = 'name')]: types.string,
    [(key = 'budgetId')]: types.string,
  })
  .actions((self) => ({}))

export type PayeeType = typeof Payee
export interface IPayeeInstance extends Instance<PayeeType> {}
export interface IPayeeSnap extends SnapshotIn<PayeeType> {}

export const PayeeStore = types
  .model({
    payees: types.map(Payee),
    selectedPayee: types.safeReference(Payee),
    isLoading: types.boolean,
  })
  .actions((self) => {
    const getParentInstance = (): Instance<typeof RootModel> => {
      return getParent<Instance<typeof RootModel>>(self)
    }

    const setLoading = (loading: boolean): void => {
      self.isLoading = loading
    }

    const loadPayees = flow(function* loadPayees() {
      setLoading(true)
      try {
        const parent = getParentInstance()
        const payees: any[] = yield payeeApi.loadPayees(parent.budgetStore.selectedBudget.id)
        payees.forEach((payee) => self.payees.put(payee))
      } catch (err) {
        console.error('Failed to load Payees ', err)
      } finally {
        setLoading(false)
      }
    })

    const setPayee = (Payee: Instance<PayeeType>): void => {
      self.selectedPayee = Payee
    }

    return {
      setLoading,
      loadPayees,
      setPayee,
    }
  })