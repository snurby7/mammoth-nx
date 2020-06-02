import { Injectable } from '@angular/core';
import {
  ICreateTransaction,
  ITransaction,
  ITransactionDetail,
  ITransactionQuery,
} from '@mammoth/api-interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../core';
import { TransactionApiRoute } from './transaction-api.routes';

@Injectable()
export class TransactionAgent {
  constructor(private httpService: HttpService) {}

  public getTransactions(
    budgetId: string,
    query: ITransactionQuery
  ): Observable<ITransaction[]> {
    return this.httpService.post(TransactionApiRoute.GetTransactions, query, {
      budgetId,
    });
  }

  public getTransactionDetail(): Observable<ITransaction> {
    throw new Error('Not implemented in API yet.');
  }

  public deleteTransaction(
    budgetId: string,
    transactionId: string
  ): Observable<void> {
    return this.httpService.delete(
      TransactionApiRoute.DeleteTransactionDetail,
      { budgetId, transactionId }
    );
  }

  public createTransaction(
    budgetId: string,
    transaction: ICreateTransaction
  ): Observable<ITransaction> {
    return this.httpService.post(
      TransactionApiRoute.CreateTransaction,
      transaction,
      { budgetId }
    );
  }

  public updateTransaction(
    budgetId: string,
    transactionId: string,
    transaction: ITransaction
  ): Observable<ITransaction> {
    return this.httpService.post(
      TransactionApiRoute.UpdateTransactionDetail,
      transaction,
      { budgetId, transactionId }
    );
  }

  public getTransactionsForAccount(
    budgetId: string,
    accountId: string
  ): Observable<ITransactionDetail[]> {
    return this.httpService.post(
      TransactionApiRoute.GetTransactionsByAccount,
      {},
      { budgetId, accountId }
    );
  }

  public getTransactionsForPayee(
    budgetId: string,
    payeeId: string
  ): Observable<ITransactionDetail[]> {
    return this.httpService.post(
      TransactionApiRoute.GetTransactionsByPayee,
      {},
      { budgetId, payeeId }
    );
  }

  public getTransactionsForCategory(
    budgetId: string,
    categoryId: string
  ): Observable<ITransactionDetail[]> {
    return this.httpService.post(
      TransactionApiRoute.GetTransactionsByCategory,
      {},
      { budgetId, categoryId }
    );
  }
}
