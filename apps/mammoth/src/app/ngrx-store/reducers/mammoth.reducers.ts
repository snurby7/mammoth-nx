import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { IMammothState } from '../state/mammoth.state';
import { accountReducers } from './account.reducer';
import { budgetReducers } from './budget.reducers';

export const mammothReducers: ActionReducerMap<IMammothState, any> = {
  router: routerReducer,
  accounts: accountReducers,
  budgets: budgetReducers,
};
