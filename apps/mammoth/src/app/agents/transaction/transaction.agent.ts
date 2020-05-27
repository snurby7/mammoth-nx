import { Injectable } from '@angular/core';
import { ICreateTransaction, ITransaction } from '@mammoth/api-interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../core';

@Injectable()
export class TransactionAgent {
  constructor(private httpService: HttpService) {}

  public getTransactions(): Observable<ITransaction[]> {
    throw new Error('Incorrectly Implemented');
  }

  public getTransactionDetail(budgetId: string): Observable<ITransaction> {
    throw new Error('Incorrectly Implemented');
  }

  public deleteTransaction(budgetId: string): Observable<void> {
    throw new Error('Incorrectly Implemented');
  }

  public createTransaction(
    budget: ICreateTransaction
  ): Observable<ITransaction> {
    throw new Error('Incorrectly Implemented');
  }

  public updateTransaction(budget: ITransaction): Observable<ITransaction> {
    throw new Error('Incorrectly Implemented');
  }
}
