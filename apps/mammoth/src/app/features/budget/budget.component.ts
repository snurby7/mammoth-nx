import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBudget } from '@mammoth/api-interfaces';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetBudgets } from '../../ngrx-store/actions/budget.actions';
import { selectBudgetList } from '../../ngrx-store/selectors/budget.selectors';
import { IMammothState } from '../../ngrx-store/state/mammoth.state';

@Component({
  selector: 'mammoth-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {
  public budgets$: Observable<IBudget[]>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _store: Store<IMammothState>
  ) {
    this.budgets$ = this._store.pipe(select(selectBudgetList));
  }

  public ngOnInit(): void {
    this._store.dispatch(new GetBudgets());
  }

  public navigateToBudget(budget: IBudget): void {
    this.router.navigate(['v1', budget.id], {
      relativeTo: this.activatedRoute,
    });
  }
}
