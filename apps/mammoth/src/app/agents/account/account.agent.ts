import { Injectable } from '@angular/core';
import { IAccount, ICreateAccount } from '@mammoth/api-interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../core';
import { AccountApiRoute } from './account-api.routes';

@Injectable()
export class AccountAgent {
  constructor(private httpService: HttpService) {}

  public getAccounts(): Observable<IAccount[]> {
    return this.httpService.get(AccountApiRoute.GetAccounts);
  }

  public deleteAccount(accountId: string): Observable<void> {
    return this.httpService.delete(AccountApiRoute.DeleteAccount, {
      accountId,
    });
  }

  public createAccount(account: ICreateAccount): Observable<IAccount> {
    return this.httpService.post(AccountApiRoute.CreateAccount, account);
  }
}
