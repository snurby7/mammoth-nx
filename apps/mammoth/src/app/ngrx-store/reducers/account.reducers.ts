import { AccountActions, EAccountAction } from '../actions/account.actions';
import { IAccountState, initialAccountState } from '../state/account.state';

export const accountReducers = (
  state = initialAccountState,
  action: AccountActions
): IAccountState => {
  switch (action.type) {
    case EAccountAction.GetAccounts_Success: {
      return {
        ...state,
        accounts: action.payload,
      };
    }
    case EAccountAction.GetAccount_Success: {
      return {
        ...state,
        selectedAccount: action.payload,
      };
    }
    default:
      return state;
  }
};
