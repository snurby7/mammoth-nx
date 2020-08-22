import { ICoreNode } from '@mammoth/api-core'

/**
 * A base account with a running balance
 *
 * @export
 * @interface IAccount
 */
export interface IAccount extends ICoreNode {
  /**
   * The type of the given account
   *
   * @type {string}
   * @memberof IAccount
   */
  type: string

  /**
   * Friendly name for the account
   *
   * @example Checking Account
   *
   * @type {string}
   * @memberof IAccount
   */
  name: string

  /**
   * The running balance of the account, this is really a collection of the transactions linked to it.
   *
   * @type {number}
   * @memberof IAccount
   */
  balance: number
}
