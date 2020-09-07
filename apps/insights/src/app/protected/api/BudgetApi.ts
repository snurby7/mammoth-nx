import { IBudget } from '@mammoth/api-interfaces'
import { axiosInstance, replaceKeyPlaceholders } from '../../utils'

enum ApiRoute {
  CreateBudget = 'api/v1/budget',
  DeleteBudget = 'api/v1/budget/:budgetId',
  LoadBudgets = 'api/v1/budget',
}

class BudgetApi {
  public async createBudget(name: string): Promise<IBudget> {
    const response = await axiosInstance.post<IBudget>(ApiRoute.CreateBudget, { name })
    return response.data
  }
  public async loadBudgets(): Promise<IBudget[]> {
    const response = await axiosInstance.get<IBudget[]>(ApiRoute.LoadBudgets)
    return response.data
  }

  public async deleteBudget(budgetId: string): Promise<IBudget[]> {
    const response = await axiosInstance.delete(
      replaceKeyPlaceholders(ApiRoute.DeleteBudget, { budgetId })
    )
    return response.data
  }
}

export const budgetApi = new BudgetApi()
