import { Injectable } from '@angular/core';
import { IBudget } from '@mammoth/api-interfaces';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { BudgetAgent } from '../../agents';
import {
  EBudgetAction,
  GetBudget,
  GetBudgets,
  GetBudgetsSuccess,
  GetBudgetSuccess,
} from '../actions/budget.actions';
import { selectBudgetList } from '../selectors/budget.selectors';
import { IMammothState } from '../state/mammoth.state';

@Injectable()
export class BudgetEffects {
  @Effect()
  public getBudget$: Observable<GetBudgetSuccess>;

  @Effect()
  public getBudgets$: Observable<GetBudgetsSuccess>;

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
        const selectedBudget = budgets.filter((budget) => budget.id === id)[0];
        return of(new GetBudgetSuccess(selectedBudget));
      })
    );

    this.getBudgets$ = this._action$.pipe(
      ofType<GetBudgets>(EBudgetAction.GetBudgets),
      switchMap(() => this._budgetAgent.getBudgets()),
      switchMap((budgetResponse: IBudget[]) =>
        of(new GetBudgetsSuccess(budgetResponse))
      )
    );
  }
}
