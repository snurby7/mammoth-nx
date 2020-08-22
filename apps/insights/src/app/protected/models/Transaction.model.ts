import { ITransaction } from '@mammoth/api-interfaces'
import { types } from 'mobx-state-tree'
import { Account } from './Account.model'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let key: keyof ITransaction
export const Transaction = types
  .model({
    [(key = 'id')]: types.identifier,
    [(key = 'accountId')]: types.reference(Account), // TODO this is an account
    [(key = 'budgetId')]: types.string,
    [(key = 'categoryId')]: types.string, // TODO this is a category
    [(key = 'payeeId')]: types.string, // TODO this is a payee
    [(key = 'date')]: types.string,
    [(key = 'inflow')]: types.number,
    [(key = 'outflow')]: types.number,
    [(key = 'memo')]: types.string,
  })
  .actions((self) => ({}))
  .views((self) => ({}))
