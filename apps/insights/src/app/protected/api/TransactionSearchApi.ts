import { IDateRangeSearchQuery, ITransactionDetail } from '@mammoth/api-interfaces'
import { axiosInstance, replaceKeyPlaceholders, toQueryParams } from '../../utils'

enum ApiRoute {
  SearchTransactions = 'api/v1/transaction/:budgetId/search',
}

class TransactionSearchApi {
  /**
   * Given a set of query parameters it will go find the matching transactions
   *
   * @param {string} budgetId The budgetId the account should be under
   * @returns {Promise<ITransactionDetail[]>} A list of all transaction details
   * @memberof TransactionApi
   */
  public async searchTransactions(
    budgetId: string,
    searchRequest: IDateRangeSearchQuery
  ): Promise<ITransactionDetail[]> {
    const url = replaceKeyPlaceholders(ApiRoute.SearchTransactions, { budgetId }).concat(
      toQueryParams(searchRequest)
    )
    const response = await axiosInstance.get<ITransactionDetail[]>(url)
    return response.data
  }
}
export const transactionSearchApi = new TransactionSearchApi()
