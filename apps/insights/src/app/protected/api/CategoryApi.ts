import { ICategory, ICreateCategory } from '@mammoth/api-interfaces'
import { axiosInstance, replaceKeyPlaceholders } from '../../utils'

enum ApiRoute {
  CreateCategory = '/api/v1/category/:budgetId/create',
  LoadCategories = '/api/v1/category/:budgetId/list',
}

class CategoryApi {
  public async createCategory(request: ICreateCategory): Promise<ICategory> {
    const response = await axiosInstance.post<ICategory>(
      replaceKeyPlaceholders(ApiRoute.CreateCategory, {
        budgetId: request.budgetId,
      }),
      request
    )
    return response.data
  }

  public async loadCategories(budgetId: string) {
    const response = await axiosInstance.get<ICategory[]>(
      replaceKeyPlaceholders(ApiRoute.LoadCategories, { budgetId })
    )
    return response.data
  }
}
export const categoryApi = new CategoryApi()
