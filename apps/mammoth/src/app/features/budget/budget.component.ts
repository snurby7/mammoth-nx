import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IBudget, ICreateBudget } from '@mammoth/api-interfaces';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CreateBudget,
  DeleteBudget,
  GetBudgets,
  UpdateBudget,
} from '../../ngrx-store/actions/budget.actions';
import { selectBudgetList } from '../../ngrx-store/selectors/budget.selectors';
import { IMammothState } from '../../ngrx-store/state/mammoth.state';
import { BudgetDialogComponent } from './budget-dialog/budget-dialog.component';

@Component({
  selector: 'mammoth-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit {
  public budgets$: Observable<IBudget[]>;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _store: Store<IMammothState>
  ) {
    this.budgets$ = this._store.pipe(select(selectBudgetList));
  }

  /**
   * Lifecycle Hook - on init get all the budgets.
   *
   * @memberof BudgetComponent
   */
  public ngOnInit(): void {
    this._store.dispatch(new GetBudgets());
  }

  /**
   * Navigate to the selected budget
   *
   * @param {string} budgetId Selected budget Id to navigate to
   * @memberof BudgetComponent
   */
  public onSelect(budgetId: string): void {
    this.router.navigate(['v1', budgetId], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * Deletes a budget on click
   *
   * @param {IBudget} budget Delete budget data
   * @memberof BudgetComponent
   */
  public deleteBudget(budget: IBudget): void {
    this._store.dispatch(new DeleteBudget(budget.id));
  }

  /**
   * Add a new budget from the response of a dialog
   *
   * @memberof BudgetComponent
   */
  public addNewBudget(): void {
    const dialogRef = this.dialog.open(BudgetDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: ICreateBudget | null) => {
      if (result) {
        this._store.dispatch(new CreateBudget(result));
      }
    });
  }

  /**
   * Function to edit a budget.
   *
   * @param {IBudget} budget
   * @memberof BudgetComponent
   */
  public updateBudget(budget: IBudget): void {
    const dialogRef = this.dialog.open(BudgetDialogComponent, {
      data: { budget },
    });

    dialogRef.afterClosed().subscribe((result: IBudget | null) => {
      if (result) {
        this._store.dispatch(new UpdateBudget(result));
      }
    });
  }
}
