import { IBudget, ICreateBudget, IUpdateBudget } from '@mammoth/api-interfaces';
import { Action } from '@ngrx/store';

export enum EBudgetAction {
  CreateBudget = '[Budget] Add Budget',
  CreateBudget_Success = '[Budget] Add Budget Success',
  GetBudgets = '[Budget] Get Budgets',
  GetBudgets_Success = '[Budget] Get Budgets Success',
  GetBudget = '[Budget] Get Budget',
  GetBudget_Success = '[Budget] Get Budget Success',
  DeleteBudget = '[Budget] Delete Budget',
  DeleteBudget_Success = '[Budget] Delete Budget Success',
  UpdateBudget = '[Budget] Update Budget',
  UpdateBudget_Success = '[Budget] Update Budget Success',
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

export class DeleteBudget implements Action {
  public readonly type = EBudgetAction.DeleteBudget;
  constructor(public payload: string) {}
}

export class DeleteBudgetSuccess implements Action {
  public readonly type = EBudgetAction.DeleteBudget_Success;
  constructor(public payload: string) {}
}

export class CreateBudget implements Action {
  public readonly type = EBudgetAction.CreateBudget;
  constructor(public payload: ICreateBudget) {}
}

export class CreateBudgetSuccess implements Action {
  public readonly type = EBudgetAction.CreateBudget_Success;
  constructor(public payload: IBudget) {}
}

export class UpdateBudget implements Action {
  public readonly type = EBudgetAction.UpdateBudget;
  constructor(public payload: IUpdateBudget) {}
}

export class UpdateBudgetSuccess implements Action {
  public readonly type = EBudgetAction.UpdateBudget_Success;
  constructor(public payload: IBudget) {}
}

export type BudgetActions =
  | CreateBudget
  | CreateBudgetSuccess
  | DeleteBudget
  | DeleteBudgetSuccess
  | GetBudgets
  | GetBudgetsSuccess
  | GetBudget
  | GetBudgetSuccess
  | UpdateBudget
  | UpdateBudgetSuccess;
