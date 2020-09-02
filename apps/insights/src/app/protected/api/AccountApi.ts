import { IAccount, ICreateAccount } from '@mammoth/api-interfaces'
import { axiosInstance, replaceKeyPlaceholders } from '../../utils'

enum ApiRoute {
  LoadAccounts = '/api/v1/accounts/:budgetId',
  CreateAccount = '/api/v1/accounts/:budgetId',
}

class AccountApi {
  public async loadAccounts(budgetId: string): Promise<IAccount[]> {
    const response = await axiosInstance.get<IAccount[]>(
      replaceKeyPlaceholders(ApiRoute.LoadAccounts, { budgetId })
    )
    return response.data
  }

  public async createAccount(account: ICreateAccount): Promise<IAccount> {
    const response = await axiosInstance.post(
      replaceKeyPlaceholders(ApiRoute.CreateAccount, { budgetId: account.budgetId }),
      account
    )
    return response.data
  }
}

export const accountApi = new AccountApi()
