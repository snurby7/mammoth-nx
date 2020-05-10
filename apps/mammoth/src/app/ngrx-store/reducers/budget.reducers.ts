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
    case EBudgetAction.DeleteBudget_Success: {
      return {
        ...state,
        selectedBudget:
          state.selectedBudget && state.selectedBudget.id === action.payload
            ? null
            : state.selectedBudget,
        budgets: state.budgets.filter((budget) => budget.id !== action.payload),
      };
    }
    case EBudgetAction.CreateBudget_Success: {
      return {
        ...state,
        budgets: [...state.budgets, action.payload],
      };
    }
    case EBudgetAction.UpdateBudget_Success: {
      return {
        ...state,
        budgets: state.budgets.map((budget) =>
          budget.id === action.payload.id ? action.payload : budget
        ),
      };
    }
    default:
      return state;
  }
};
