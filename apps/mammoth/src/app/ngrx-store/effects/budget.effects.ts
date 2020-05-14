import { Injectable } from '@angular/core';
import { IBudget } from '@mammoth/api-interfaces';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { flatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { BudgetAgent } from '../../agents';
import {
  CreateBudget,
  CreateBudgetSuccess,
  DeleteBudget,
  DeleteBudgetSuccess,
  EBudgetAction,
  GetBudget,
  GetBudgets,
  GetBudgetsSuccess,
  GetBudgetSuccess,
  UpdateBudget,
  UpdateBudgetSuccess,
} from '../actions/budget.actions';
import { selectBudgetList } from '../selectors/budget.selectors';
import { IMammothState } from '../state/mammoth.state';

@Injectable()
export class BudgetEffects {
  @Effect()
  public getBudget$: Observable<GetBudgetSuccess>;

  @Effect()
  public getBudgets$: Observable<GetBudgetsSuccess>;

  @Effect()
  public deleteBudget$: Observable<DeleteBudgetSuccess>;

  @Effect()
  public createBudget$: Observable<CreateBudgetSuccess>;

  @Effect()
  public updateBudget$: Observable<UpdateBudgetSuccess>;

  constructor(
    private _budgetAgent: BudgetAgent,
    private _action$: Actions,

    private _store: Store<IMammothState>
  ) {
    this.getBudget$ = this._action$.pipe(
      ofType<GetBudget>(EBudgetAction.GetBudget),
      map((action) => action.payload),
      withLatestFrom(this._store.pipe(select(selectBudgetList))),
      switchMap(([id, budgets]) => {
        const response$ = (selectedBudget: IBudget) =>
          of(new GetBudgetSuccess(selectedBudget));
        if (
          budgets &&
          budgets.length > 0 &&
          budgets.some((budget) => budget.id === id)
        ) {
          return response$(budgets.find((budget) => budget.id === id));
        }
        console.log('request fired');
        return this._budgetAgent
          .getBudgetDetail(id)
          .pipe(flatMap((budget) => response$(budget)));
      })
    );

    this.getBudgets$ = this._action$.pipe(
      ofType<GetBudgets>(EBudgetAction.GetBudgets),
      switchMap(() => this._budgetAgent.getBudgets()),
      switchMap((budgetResponse: IBudget[]) =>
        of(new GetBudgetsSuccess(budgetResponse))
      )
    );

    this.deleteBudget$ = this._action$.pipe(
      ofType<DeleteBudget>(EBudgetAction.DeleteBudget),
      map((action) => action.payload),
      switchMap((budgetId) =>
        this._budgetAgent.deleteBudget(budgetId).pipe(map(() => budgetId))
      ),
      switchMap((budgetId) => of(new DeleteBudgetSuccess(budgetId)))
    );

    this.createBudget$ = this._action$.pipe(
      ofType<CreateBudget>(EBudgetAction.CreateBudget),
      map((action) => action.payload),
      switchMap((budget) => this._budgetAgent.createBudget(budget)),
      switchMap((budget) => of(new CreateBudgetSuccess(budget)))
    );

    this.updateBudget$ = this._action$.pipe(
      ofType<UpdateBudget>(EBudgetAction.UpdateBudget),
      map((action) => action.payload),
      switchMap((budget) => this._budgetAgent.updateBudget(budget)),
      switchMap((budget) => of(new UpdateBudgetSuccess(budget)))
    );
  }
}
