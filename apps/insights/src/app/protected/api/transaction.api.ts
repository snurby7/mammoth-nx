import { ITransactionDetail } from '@mammoth/api-interfaces'
import { axiosInstance, replaceKeyPlaceholders } from '../../utils'

enum ApiRoute {
  LoadTransactionsByAccount = 'api/v1/transaction/:budgetId/account/:accountId',
}

class TransactionApi {
  public async loadTransactionsByAccount(
    budgetId: string,
    accountId: string
  ): Promise<ITransactionDetail[]> {
    const response = await axiosInstance.get<ITransactionDetail[]>(
      replaceKeyPlaceholders(ApiRoute.LoadTransactionsByAccount, { budgetId, accountId })
    )
    return response.data
  }
}
export const transactionApi = new TransactionApi()
