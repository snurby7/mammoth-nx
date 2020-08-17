import { IAccount } from '@mammoth/api-interfaces'
import { replaceKeyPlaceholders } from '../../utils'
import { BaseApi } from './base.api'

enum ApiRoute {
  LoadAccounts = '/api/v1/accounts/:budgetId',
}

class AccountApi extends BaseApi {
  public async loadAccounts(budgetId: string): Promise<IAccount[]> {
    const response = await this.axios.get<IAccount[]>(
      replaceKeyPlaceholders(ApiRoute.LoadAccounts, { budgetId })
    )
    return response.data
  }
}

export const accountApi = new AccountApi()
