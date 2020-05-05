import { Injectable } from '@angular/core';
import { IBudget } from '@mammoth/api-interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/http';
import { BudgetApiRoute } from './budget-api-routes';

@Injectable()
export class BudgetAgent {
  constructor(private httpService: HttpService) {}

  public getBudgets(): Observable<IBudget[]> {
    return this.httpService.get(BudgetApiRoute.GetBudgets);
  }
}
