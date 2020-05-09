import { IAccount } from '@mammoth/api-interfaces';
import { Action } from '@ngrx/store';

export enum EAccountAction {
  GetAccounts = '[Account] Get Accounts',
  GetAccounts_Success = '[Account] Get Accounts Success',
  GetAccount = '[Account] Get Account',
  GetAccount_Success = '[Account] Get Account Success',
}

export class GetAccounts implements Action {
  public readonly type = EAccountAction.GetAccounts;
}

export class GetAccountsSuccess implements Action {
  public readonly type = EAccountAction.GetAccounts_Success;
  constructor(public payload: IAccount[]) {}
}

export class GetAccount implements Action {
  public readonly type = EAccountAction.GetAccount;
  constructor(public payload: string) {}
}

export class GetAccountSuccess implements Action {
  public readonly type = EAccountAction.GetAccount_Success;
  constructor(public payload: IAccount) {}
}

export type AccountActions =
  | GetAccounts
  | GetAccountsSuccess
  | GetAccount
  | GetAccountSuccess;
