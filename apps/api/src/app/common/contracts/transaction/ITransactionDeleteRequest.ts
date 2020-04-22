/**
 * Delete request to remove a transaction from a given budget
 *
 * @export
 * @interface ITransactionDeleteRequest
 */
export interface ITransactionDeleteRequest {
  /**
   * Budget Id to find the transaction under.
   *
   * @type {string}
   * @memberof ITransactionDeleteRequest
   */
  budgetId: string;

  /**
   * The transaction id to delete. Deleting will also impact the account/categories/payee
   *
   * @type {string}
   * @memberof ITransactionDeleteRequest
   */
  id: string;
}
