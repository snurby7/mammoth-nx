import { Injectable } from '@angular/core';
import { IAccount } from '@mammoth/api-interfaces';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AccountAgent } from '../../agents';
import {
  CreateAccount,
  CreateAccountSuccess,
  DeleteAccount,
  DeleteAccountSuccess,
  EAccountAction,
  GetAccount,
  GetAccounts,
  GetAccountsSuccess,
  GetAccountSuccess,
} from '../actions/Account.actions';
import { selectAccountList } from '../selectors/Account.selectors';
import { IMammothState } from '../state/mammoth.state';

@Injectable()
export class AccountEffects {
  @Effect()
  public getAccount$: Observable<GetAccountSuccess>;

  @Effect()
  public getAccounts$: Observable<GetAccountsSuccess>;

  @Effect()
  public deleteAccount$: Observable<DeleteAccountSuccess>;

  @Effect()
  public createAccount$: Observable<CreateAccountSuccess>;

  constructor(
    private _accountAgent: AccountAgent,
    private _action$: Actions,
    private _store: Store<IMammothState>
  ) {
    this.getAccount$ = this._action$.pipe(
      ofType<GetAccount>(EAccountAction.GetAccount),
      map((action) => action.payload),
      withLatestFrom(this._store.pipe(select(selectAccountList))),
      switchMap(([id]) => {
        return of(new GetAccountSuccess(id));
      })
    );

    this.getAccounts$ = this._action$.pipe(
      ofType<GetAccounts>(EAccountAction.GetAccounts),
      switchMap(() => this._accountAgent.getAccounts()),
      switchMap((AccountResponse: IAccount[]) =>
        of(new GetAccountsSuccess(AccountResponse))
      )
    );

    this.deleteAccount$ = this._action$.pipe(
      ofType<DeleteAccount>(EAccountAction.DeleteAccount),
      map((action) => action.payload),
      switchMap((accountId) =>
        this._accountAgent.deleteAccount(accountId).pipe(map(() => accountId))
      ),
      switchMap((accountId) => of(new DeleteAccountSuccess(accountId)))
    );

    this.createAccount$ = this._action$.pipe(
      ofType<CreateAccount>(EAccountAction.CreateAccount),
      map((action) => action.payload),
      switchMap((Account) => this._accountAgent.createAccount(Account)),
      switchMap((Account) => of(new CreateAccountSuccess(Account)))
    );
  }
}
