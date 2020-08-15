import { IBudget } from '@mammoth/api-interfaces'
import { BaseApi } from './base.api'

enum ApiRoute {
  LoadBudgetsV1 = 'api/v1/budget',
}

class BudgetApi extends BaseApi {
  public async loadBudgets(): Promise<IBudget[]> {
    const response = await this.axios.get<IBudget[]>(ApiRoute.LoadBudgetsV1)
    return response.data
  }
}

export const budgetApi = new BudgetApi()
