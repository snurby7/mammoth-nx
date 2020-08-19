import { IBudget } from '@mammoth/api-interfaces'
import { axiosInstance } from '../../utils'

enum ApiRoute {
  LoadBudgetsV1 = 'api/v1/budget',
}

class BudgetApi {
  public async loadBudgets(): Promise<IBudget[]> {
    const response = await axiosInstance.get<IBudget[]>(ApiRoute.LoadBudgetsV1)
    return response.data
  }
}

export const budgetApi = new BudgetApi()
