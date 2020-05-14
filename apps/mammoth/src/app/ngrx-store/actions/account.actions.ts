import { IAccount } from '@mammoth/api-interfaces';
import { createAction, props } from '@ngrx/store';

export enum EAccountAction {
  GetAccountList = '[Account] Get Account List',
  GetAccountList_Success = '[Account] Get Account List Success',
  GetAccount = '[Account] Get Account',
  GetAccount_Success = '[Account] Get Account Success',
  DeleteAccount = '[Account] Delete Account',
  DeleteAccount_Success = '[Account] Delete Account Success',
  CreateAccount = '[Account] Create Account',
  CreateAccount_Success = '[Account] Create Account Success',
}

// Get many accounts.
export const ng_GetAccountList = createAction(EAccountAction.GetAccountList);
export const ng_GetAccountList_Success = createAction(
  EAccountAction.GetAccountList_Success,
  props<{ accounts: IAccount[] }>()
);

// Get a single account
export const ng_GetAccount = createAction(
  EAccountAction.GetAccount_Success,
  props<{ accountId: string }>()
);
export const ng_GetAccount_Success = createAction(
  EAccountAction.GetAccount_Success,
  props<{ selectedAccount: IAccount }>()
);
