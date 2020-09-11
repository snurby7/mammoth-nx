import {
  ICreateTransaction,
  IDeleteResponse,
  ITransaction,
  ITransactionDetail,
} from '@mammoth/api-interfaces'
import { axiosInstance, replaceKeyPlaceholders } from '../../utils'

enum ApiRoute {
  SearchTransactions = 'api/v1/transaction/search',
}

class TransactionApi {
  /**
   * Given a set of query parameters it will go find the matching transactions
   *
   * @param {string} budgetId The budgetId the account should be under
   * @returns {Promise<ITransactionDetail[]>} A list of all transaction details
   * @memberof TransactionApi
   */
  public async searchTransactions(budgetId: string): Promise<ITransactionDetail[]> {
    // TODO make this use query parameters, so it can be restful.
    const response = await axiosInstance.get<ITransactionDetail[]>(
      replaceKeyPlaceholders(ApiRoute.SearchTransactions, { budgetId })
    )
    return response.data
  }

  /**
   * Creates a brand new transaction
   *
   * @param {string} budgetId The budget to link the transaction too
   * @param {ICreateTransaction} payload The transaction to be created
   * @returns {Promise<ITransaction>} The transaction from the payload with a set id
   * @memberof TransactionApi
   */
  public async createTransaction(
    budgetId: string,
    payload: ICreateTransaction
  ): Promise<ITransaction> {
    const response = await axiosInstance.post<ITransaction>(
      replaceKeyPlaceholders(ApiRoute.CreateTransaction, { budgetId }),
      payload
    )
    return response.data
  }

  /**
   * Deletes a transaction from the database
   *
   * @param {string} budgetId The budget to delete it from
   * @param {string} transactionId The id of the transaction to be removed
   * @returns {Promise<ITransaction>} The response from the delete operation
   * @memberof TransactionApi
   */
  public async deleteTransaction(
    budgetId: string,
    transactionId: string
  ): Promise<IDeleteResponse> {
    const response = await axiosInstance.delete<IDeleteResponse>(
      replaceKeyPlaceholders(ApiRoute.ModifyExistingTransaction, { budgetId, transactionId })
    )
    return response.data
  }

  /**
   * Will send a POST off to the server and get the updated Transaction on success
   *
   * @param {string} budgetId The budgetId this transaction is linked too
   * @param {ITransaction} payload The new transaction details
   * @returns {Promise<ITransaction>} The newly saved transaction (should match the payload)
   * @memberof TransactionApi
   */
  public async updateTransaction(budgetId: string, payload: ITransaction): Promise<ITransaction> {
    const response = await axiosInstance.post<ITransaction>(
      replaceKeyPlaceholders(ApiRoute.ModifyExistingTransaction, {
        budgetId,
        transactionId: payload.id,
      }),
      payload
    )
    return response.data
  }
}
export const transactionApi = new TransactionApi()
