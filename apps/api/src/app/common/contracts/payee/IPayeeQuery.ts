import { IBaseSearchQuery } from '../generic';

/**
 * The base
 *
 * @export
 * @interface IPayeeQuery
 */
export interface IPayeeQuery extends IBaseSearchQuery {
  /**
   * Name of a payee to potentially match something from.
   *
   * @type {string}
   * @memberof IPayeeQuery
   */
  name?: string;
}
