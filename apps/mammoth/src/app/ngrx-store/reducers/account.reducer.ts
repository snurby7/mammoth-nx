import { Action, createReducer, on } from '@ngrx/store';
import {
    GetAccountList_Success,
    GetAccount_Success
} from '../actions/account.actions';
import { IAccountState, initialAccountState } from '../state/account.state';

export const reducers = createReducer(
  initialAccountState,
  on(GetAccountList_Success, (state, { accounts }) => ({
    ...state,
    accounts,
  })),
  on(GetAccount_Success, (state, { selectedAccount }) => ({
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
