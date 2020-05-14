import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, first, switchMap, tap } from 'rxjs/operators';
import { GetBudget } from '../../ngrx-store/actions/budget.actions';
import { selectSelectedBudget } from '../../ngrx-store/selectors/budget.selectors';
import { IMammothState } from '../../ngrx-store/state/mammoth.state';

@Injectable()
export class DashboardLoadGuard implements CanActivate {
  constructor(private _store: Store<IMammothState>) {}


  /**
   * Route guard which will ensure that there is a selected budget before allowing this route to load.
   * The budgetId is in the URL so querying the database for that quickly is a breeze.
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns
   * @memberof DashboardLoadGuard
   */
  public canActivate(route: ActivatedRouteSnapshot) {
    return this._store.pipe(
      select(selectSelectedBudget),
      tap((selectedBudget) => {
        if (!selectedBudget) {
          this._store.dispatch(new GetBudget(route.params['budgetId']));
        }
      }),
      filter((data) => !!data),
      switchMap((budget) => of(Boolean(budget))),
      first()
    );
  }
}
