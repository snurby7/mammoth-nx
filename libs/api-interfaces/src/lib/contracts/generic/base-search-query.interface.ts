import { ICoreNode } from '@mammoth/api-core';

/**
 * A base search query interface for easy, common extension
 *
 * @export
 * @interface IBaseSearchQuery
 */
export interface IBaseSearchQuery extends Omit<ICoreNode, 'id' | 'name'> {
  /**
   * Number of items you want to have be returned back
   *
   * @type {number}
   * @memberof IBaseSearchQuery
   */
  limit?: number;
  name?: string;
}
