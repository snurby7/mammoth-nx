import { IAccount } from '@mammoth/api-interfaces';

export interface IAccountState {
  accounts: IAccount[];
  selectedAccount: IAccount;
}

export const initialAccountState: IAccountState = {
  accounts: null,
  selectedAccount: null,
};
