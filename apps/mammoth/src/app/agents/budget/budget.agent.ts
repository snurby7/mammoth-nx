import { Injectable } from '@angular/core';
import { IBudget, ICreateBudget, IUpdateBudget } from '@mammoth/api-interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../core';
import { BudgetApiRoute } from './budget-api.routes';

@Injectable()
export class BudgetAgent {
  constructor(private httpService: HttpService) {}

  public getBudgets(): Observable<IBudget[]> {
    return this.httpService.get(BudgetApiRoute.GetBudgetList);
  }

  public getBudgetDetail(budgetId: string): Observable<IBudget> {
    return this.httpService.get(BudgetApiRoute.GetBudget, {
      budgetId,
    });
  }

  public deleteBudget(budgetId: string): Observable<void> {
    return this.httpService.delete(BudgetApiRoute.DeleteBudget, {
      budgetId,
    });
  }

  public createBudget(budget: ICreateBudget): Observable<IBudget> {
    return this.httpService.post(BudgetApiRoute.CreateBudget, budget);
  }

  public updateBudget(budget: IUpdateBudget): Observable<IBudget> {
    return this.httpService.post(BudgetApiRoute.UpdateBudget, budget, {
      budgetId: budget.id,
    });
  }
}
