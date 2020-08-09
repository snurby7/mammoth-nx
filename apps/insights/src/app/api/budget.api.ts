import { IBudget } from '@mammoth/api-interfaces'
import { BaseApi } from './base.api'
import { BudgetApiRoute } from './budget.api.routes'

class BudgetApi extends BaseApi {
  public async getBudgets(): Promise<IBudget[]> {
    const response = await this.axios.get<IBudget[]>(BudgetApiRoute.GetBudgetsV1)
    return response.data
  }
}

export const budgetApi = new BudgetApi()
