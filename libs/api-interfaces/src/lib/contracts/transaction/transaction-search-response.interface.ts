import { ITransaction } from './transaction.interface';

/**
 * A search response with a collection of transactions
 *
 * @export
 * @interface ITransactionSearchResponse
 */
export interface ITransactionSearchResponse {
  /**
   * A collection of transactions returned from the search request
   *
   * @type {ITransaction[]}
   * @memberof ITransactionSearchResponse
   */
  results: ITransaction[];
  // TODO: will this stand up with subtransactions in the future?
}
