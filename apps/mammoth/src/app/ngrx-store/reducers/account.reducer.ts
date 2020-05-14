import { Action, createReducer, on } from '@ngrx/store';
import {
  ng_GetAccountList_Success,
  ng_GetAccount_Success,
} from '../actions/account.actions';
import { IAccountState, initialAccountState } from '../state/account.state';

export const reducers = createReducer(
  initialAccountState,
  on(ng_GetAccountList_Success, (state, { accounts }) => ({
    ...state,
    accounts,
  })),
  on(ng_GetAccount_Success, (state, { selectedAccount }) => ({
    ...state,
    selectedAccount,
  }))
);

export function accountReducers(
  state: IAccountState | undefined,
  action: Action
) {
  return reducers(state, action);
}
