import { IBudget } from '@mammoth/api-interfaces';

export interface IBudgetState {
  budgets: IBudget[];
  selectedBudget: IBudget;
}

export const initialBudgetState: IBudgetState = {
  budgets: null,
  selectedBudget: null,
};
