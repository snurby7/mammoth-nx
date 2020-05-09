import { IBudget } from '@mammoth/api-interfaces';
import { Action } from '@ngrx/store';

export enum EBudgetAction {
  GetBudgets = '[Budget] Get Budgets',
  GetBudgets_Success = '[Budget] Get Budgets Success',
  GetBudget = '[Budget] Get Budget',
  GetBudget_Success = '[Budget] Get Budget Success',
}

export class GetBudgets implements Action {
  public readonly type = EBudgetAction.GetBudgets;
}

export class GetBudgetsSuccess implements Action {
  public readonly type = EBudgetAction.GetBudgets_Success;
  constructor(public payload: IBudget[]) {}
}

export class GetBudget implements Action {
  public readonly type = EBudgetAction.GetBudget;
  constructor(public payload: string) {}
}

export class GetBudgetSuccess implements Action {
  public readonly type = EBudgetAction.GetBudget_Success;
  constructor(public payload: IBudget) {}
}

export type BudgetActions =
  | GetBudgets
  | GetBudgetsSuccess
  | GetBudget
  | GetBudgetSuccess;
