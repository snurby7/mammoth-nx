import { IAccount } from '@mammoth/api-interfaces'
import { axiosInstance, replaceKeyPlaceholders } from '../../utils'

enum ApiRoute {
  LoadAccounts = '/api/v1/accounts/:budgetId',
}

class AccountApi {
  public async loadAccounts(budgetId: string): Promise<IAccount[]> {
    const response = await axiosInstance.get<IAccount[]>(
      replaceKeyPlaceholders(ApiRoute.LoadAccounts, { budgetId })
    )
    return response.data
  }
}

export const accountApi = new AccountApi()
