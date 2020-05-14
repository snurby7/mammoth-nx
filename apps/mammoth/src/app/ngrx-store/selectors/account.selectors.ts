import { createSelector } from '@ngrx/store';
import { IAccountState } from '../state/account.state';
import { IMammothState } from '../state/mammoth.state';

const selectAccounts = (state: IMammothState) => state.accounts;

export const selectAccountList = createSelector(
  selectAccounts,
  (state: IAccountState) => state.accounts
);

export const selectSelectedAccount = createSelector(
  selectAccounts,
  (state: IAccountState) => state.selectedAccount
);
