import { ICategory } from '@mammoth/api-interfaces'
import { axiosInstance, replaceKeyPlaceholders } from '../../utils'

enum ApiRoute {
  LoadCategories = '/api/v1/category/list/:budgetId',
}

class CategoryApi {
  public async loadCategories(budgetId: string) {
    const response = await axiosInstance.get<ICategory[]>(
      replaceKeyPlaceholders(ApiRoute.LoadCategories, { budgetId })
    )
    return response.data
  }
}
export const categoryApi = new CategoryApi()
