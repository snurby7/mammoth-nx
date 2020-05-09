import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetBudget } from '../../ngrx-store/actions/budget.actions';
import { IMammothState } from '../../ngrx-store/state/mammoth.state';

@Component({
  selector: 'mammoth-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
  public mobileQuery: MediaQueryList;
  public fillerNav: string[] = [];
  public fillerContent = [];
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private route: ActivatedRoute,
    private _store: Store<IMammothState>
  ) {
    this._store.dispatch(new GetBudget(this.route.snapshot.params['budgetId']));
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
    this.fillerContent = Array.from(
      { length: 50 },
      () => `Bunch of filler content`
    );
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
