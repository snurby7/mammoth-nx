import { SupportedAccountType } from '../../../common';

/**
 * A base account with a running balance
 *
 * @export
 * @interface IAccount
 */
export interface IAccount {
  /**
   * Generated Id for the account.
   *
   * @type {string}
   * @memberof IAccount
   */
  id: string;

  /**
   * Budget Id that the account is linked to
   *
   * @type {string}
   * @memberof IAccount
   */
  budgetId: string;

  /**
   * The type of the given account
   *
   * @type {SupportedAccountType}
   * @memberof IAccount
   */
  type: SupportedAccountType;

  /**
   * Friendly name for the account
   *
   * @example Checking Account
   *
   * @type {string}
   * @memberof IAccount
   */
  name: string;

  /**
   * The running balance of the account, this is really a collection of the transactions linked to it.
   *
   * @type {number}
   * @memberof IAccount
   */
  balance: number;
}
