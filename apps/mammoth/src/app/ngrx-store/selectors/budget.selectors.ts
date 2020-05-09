import { createSelector } from '@ngrx/store';
import { IBudgetState } from '../state/budget.state';
import { IMammothState } from '../state/mammoth.state';

const selectBudgets = (state: IMammothState) => state.budgets;

export const selectBudgetList = createSelector(
  selectBudgets,
  (state: IBudgetState) => state.budgets
);

export const selectSelectedBudget = createSelector(
  selectBudgets,
  (state: IBudgetState) => state.selectedBudget
);
