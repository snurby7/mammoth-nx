import { ICoreNode } from '@mammoth/api-core';
import { ICategory } from './category.interface';

/**
 * The response from a search
 *
 * @export
 * @interface ICategorySearchResponse
 */
export interface ICategorySearchResponse extends ICoreNode {
  /**
   * Name of the category for display purposes
   *
   * @type {string}
   * @memberof ICategorySearchResponse
   */
  name: string;

  /**
   * A list of possible sub categories
   *
   * @type {ICategory[]}
   * @memberof ICategorySearchResponse
   */
  children?: ICategory[];
}
