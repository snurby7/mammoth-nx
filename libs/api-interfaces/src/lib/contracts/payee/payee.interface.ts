import { ICoreNode } from '@mammoth/api-core';

/**
 * A created payee interface
 *
 * @export
 * @interface IPayee
 */
export interface IPayee extends ICoreNode {
  /**
   * Generated Id for the payee
   *
   * @type {string}
   * @memberof IPayee
   */
  id: string;

  /**
   * Budget Id that the payee is associated to.
   *
   * @type {string}
   * @memberof IPayee
   */
  budgetId: string;

  /**
   * The name of the payee
   *
   * @example Southwest Airlines
   * @type {string}
   * @memberof IPayee
   */
  name: string;
}
