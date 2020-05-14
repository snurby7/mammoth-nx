import { Component, OnInit } from '@angular/core';
import { IAccount } from '@mammoth/api-interfaces';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ng_GetAccountList } from '../../../ngrx-store/actions/account.actions';
import { selectAccountList } from '../../../ngrx-store/selectors/account.selectors';
import { IMammothState } from '../../../ngrx-store/state/mammoth.state';

@Component({
  selector: 'mammoth-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
  public accounts$: Observable<IAccount[]>;
  constructor(private _store: Store<IMammothState>) {
    this.accounts$ = this._store.pipe(select(selectAccountList));
  }

  public ngOnInit(): void {
    this._store.dispatch(ng_GetAccountList());
  }
}
