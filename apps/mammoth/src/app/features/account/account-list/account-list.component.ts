import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccount } from '@mammoth/api-interfaces';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetAccountList } from '../../../ngrx-store/actions/account.actions';
import { selectAccountList } from '../../../ngrx-store/selectors/account.selectors';
import { IMammothState } from '../../../ngrx-store/state/mammoth.state';

@Component({
  selector: 'mammoth-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
  public accounts$: Observable<IAccount[]>;
  constructor(
    private activatedRoute: ActivatedRoute,

    private _store: Store<IMammothState>,
    private _router: Router
  ) {
    this.accounts$ = this._store.pipe(select(selectAccountList));
  }

  public ngOnInit(): void {
    this._store.dispatch(GetAccountList());
  }

  public onAccountClick(account: IAccount): void {
    this._router.navigate(['account', account.id], {
      relativeTo: this.activatedRoute,
    });
  }
}
