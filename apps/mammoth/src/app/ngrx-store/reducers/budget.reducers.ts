import { BudgetActions, EBudgetAction } from '../actions/budget.actions';
import { IBudgetState, initialBudgetState } from '../state/budget.state';

export const budgetReducers = (
  state = initialBudgetState,
  action: BudgetActions
): IBudgetState => {
  switch (action.type) {
    case EBudgetAction.GetBudgets_Success: {
      return {
        ...state,
        budgets: action.payload,
      };
    }
    case EBudgetAction.GetBudget_Success: {
      return {
        ...state,
        selectedBudget: action.payload,
      };
    }
    default:
      return state;
  }
};
