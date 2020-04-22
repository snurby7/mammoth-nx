import { ICategory } from './ICategory';

/**
 * The response from a search
 *
 * @export
 * @interface ICategorySearchResponse
 */
export interface ICategorySearchResponse {
  /**
   * Name of the category for display purposes
   *
   * @type {string}
   * @memberof ICategorySearchResponse
   */
  name: string;

  /**
   * Generated ID associated with the given category.
   *
   * @type {string}
   * @memberof ICategorySearchResponse
   */
  id: string;

  /**
   * The budgetId for the give record
   *
   * @type {string}
   * @memberof ICategorySearchResponse
   */
  budgetId: string;

  /**
   * A list of possible sub categories
   *
   * @type {ICategory[]}
   * @memberof ICategorySearchResponse
   */
  children?: ICategory[];
}
