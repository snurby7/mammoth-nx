/**
 * A base search query interface for easy, common extension
 *
 * @export
 * @interface IBaseSearchQuery
 */
export interface IBaseSearchQuery {
  /**
   * The budgetId to search over
   *
   * @type {string}
   * @memberof IBaseSearchQuery
   */
  budgetId: string;

  /**
   * Number of items you want to have be returned back
   *
   * @type {number}
   * @memberof IBaseSearchQuery
   */
  limit?: number;
}
