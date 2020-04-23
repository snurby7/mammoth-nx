import { IBaseSearchQuery } from '../generic';

/**
 * Search request for the transactions
 *
 * @export
 * @interface ITransactionQuery
 */
export interface ITransactionQuery extends IBaseSearchQuery {
  /**
   * Id of the transaction to find in particular
   *
   * @type {string}
   * @memberof ITransactionQuery
   */
  id?: string;

  /**
   * Id of an account to search over
   *
   * @type {string}
   * @memberof ITransactionQuery
   */
  accountId?: string;

  /**
   * Id of the payee that the record is linked to.
   *
   * @type {string}
   * @memberof ITransactionQuery
   */
  payeeId?: string;

  /**
   * Id of the category that the record is linked on.
   *
   * @type {string}
   * @memberof ITransactionQuery
   */
  categoryId?: string;
}
