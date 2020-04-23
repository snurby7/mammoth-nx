import { IMammothCoreNode } from '../../../neo4j';

/**
 * Interface when an account link needs to be removed
 *
 * @export
 * @interface IAccountLinkBreak
 */
export interface IAccountLinkBreak {
  /**
   * Need the budgetId so it's easier to search over a budget, there could always be multiple budgets.
   *
   * @type {string}
   * @memberof IAccountLinkBreak
   */
  budgetId: string;

  /**
   * How much to refund the link before it's removed.
   *
   * @type {number}
   * @memberof IAccountLinkBreak
   */
  refundAmount: number;

  /**
   * Given something like A -- relates_to -> B
   *
   * The value you would want to pass here is 'relates_to'
   *
   * @type {string}
   * @memberof IAccountLinkBreak
   */
  relationship: string;

  /**
   * Information about the transaction. Transactions are the driving force behind the whole account balance
   * process, so this is the core information about that transaction
   *
   * @type {IMammothCoreNode}
   * @memberof IAccountLinkBreak
   */
  transaction: IMammothCoreNode;

  /**
   * This can be either the Payee, Category, or Account information. There's no good generic name. Each of them has a running
   * balance that's determined by the transactions.
   *
   * @type {IMammothCoreNode}
   * @memberof IAccountLinkBreak
   */
  account: IMammothCoreNode;
}
