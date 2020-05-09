import {RouterReducerState} from '@ngrx/router-store'
import { IBudgetState, initialBudgetState } from './budget.state';
import { IAccountState, initialAccountState } from './account.state';

export interface IMammothState {
  router?: RouterReducerState;
  budgets: IBudgetState;
  accounts: IAccountState
}

export const initialMammothState: IMammothState = {
  budgets: initialBudgetState,
  accounts: initialAccountState
}

export function getInitialMammothState(): IMammothState {
  return initialMammothState;
}