import { Injectable } from '@angular/core';
import { IAccount, ICreateAccount } from '@mammoth/api-interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../core';
import { AccountApiRoute } from './account-api-routes';

@Injectable()
export class AccountAgent {
  constructor(private httpService: HttpService) {}

  public getAccounts(budgetId: string): Observable<IAccount[]> {
    return this.httpService.get(AccountApiRoute.GetAccounts, {
      budgetId,
    });
  }

  public deleteAccount(budgetId: string, accountId: string): Observable<void> {
    return this.httpService.delete(AccountApiRoute.DeleteAccount, {
      accountId,
      budgetId,
    });
  }

  public createAccount(
    budgetId: string,
    account: ICreateAccount
  ): Observable<IAccount> {
    return this.httpService.post(AccountApiRoute.CreateAccount, account, {
      budgetId,
    });
  }

  public updateAccount(_: any): Observable<IAccount> {
    throw new Error('not implemented yet');
  }
}
