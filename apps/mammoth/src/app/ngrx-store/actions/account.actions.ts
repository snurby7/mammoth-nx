import { IAccount, ICreateAccount } from '@mammoth/api-interfaces';
import { Action } from '@ngrx/store';

export enum EAccountAction {
  GetAccounts = '[Account] Get Accounts',
  GetAccounts_Success = '[Account] Get Accounts Success',
  GetAccount = '[Account] Get Account',
  GetAccount_Success = '[Account] Get Account Success',
  DeleteAccount = '[Account] Delete Account',
  DeleteAccount_Success = '[Account] Delete Account Success',
  CreateAccount = '[Account] Create Account',
  CreateAccount_Success = '[Account] Create Account Success',
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
  constructor(public payload: string) {}
}

export class DeleteAccount implements Action {
  public readonly type = EAccountAction.DeleteAccount;
  constructor(public payload: string) {}
}

export class DeleteAccountSuccess implements Action {
  public readonly type = EAccountAction.DeleteAccount_Success;
  constructor(public payload: string) {}
}

export class CreateAccount implements Action {
  public readonly type = EAccountAction.CreateAccount;
  constructor(public payload: ICreateAccount) {}
}

export class CreateAccountSuccess implements Action {
  public readonly type = EAccountAction.CreateAccount_Success;
  constructor(public payload: IAccount) {}
}

// TODO Need to be able to update an account
// export class UpdateAccount implements Action {
//   public readonly type = EAccountAction.UpdateAccount;
//   constructor(public payload: IAccount) {}
// }

// export class UpdateAccountSuccess implements Action {
//   public readonly type = EAccountAction.UpdateAccount_Success;
//   constructor(public payload: IAccount) {}
// }
export type AccountActions =
  | DeleteAccount
  | DeleteAccountSuccess
  | GetAccounts
  | GetAccountsSuccess
  | GetAccount
  | GetAccountSuccess;
