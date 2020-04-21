/**
 * This is the base transaction used to send data to the server and manipulate it.
 *
 * @export
 * @interface ITransaction
 */
export interface ITransaction {
  /**
   * The Generated Id for a given transaction, used for querying and saving. This will come back
   * only AFTER a transaction has been saved.
   *
   * @type {string}
   * @memberof ITransaction
   */
  id: string;

  /**
   * The Id of the budget which the transaction is attached to. This must always
   * be sent.
   *
   * @type {string}
   * @memberof ITransaction
   */
  budgetId: string;

  /**
   * An ISO formatted date string that reflects when the transaction was created.
   * This is not automatically generated as this will be moveable to back date a transaction.
   *
   * @type {string}
   * @memberof ITransaction
   */
  date: string;

  /**
   * Account Id to tie this to, this is needed to reflect the correct balance on that account.
   * Accounts are only a collection of transactions at the core of it.
   *
   * @type {string}
   * @memberof ITransaction
   */
  accountId: string;

  /**
   * Payee Id to tie this to, this is needed to reflect the correct balance on that payee.
   * Payees don't inherently have a balance, but a later implementation could use that balance for something.
   *
   * @type {string}
   * @memberof ITransaction
   */
  payeeId: string;

  /**
   * Category Id to tie this to, this is needed to reflect the correct balance on that category.
   * Categories are only an aggregation of transactions at the core of it.
   *
   * @type {string}
   * @memberof ITransaction
   */
  categoryId: string;

  /**
   * Total of how much money was made. Someone gave you money, that's an inflow.
   *
   * @type {number}
   * @memberof ITransaction
   */
  inflow?: number;

  /**
   * Total of how much money left the budget. You paid for something, that's an outflow
   *
   * @type {number}
   * @memberof ITransaction
   */
  outflow?: number;

  /**
   * Note about the transaction, maybe you need to take a look at something, that's where the memo comes in.
   *
   * @type {string}
   * @memberof ITransaction
   */
  memo?: string;
}
