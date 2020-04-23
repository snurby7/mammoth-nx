import { ICoreNode } from '@mammoth/api-core';

/**
 * The interface to implement whenever a category is to be updated
 *
 * @export
 * @interface ICategoryUpdate
 */
export interface ICategoryUpdate extends ICoreNode {
  /**
   * A possible new name for the Category
   *
   * @type {string}
   * @memberof ICategoryUpdate
   */
  name: string;

  /**
   * The possibly new category Id to associate the category to. This is used for linking to a parent.
   * Possible cases:
   *  1. Category Id is the same as the existing record.
   *  2. Id is different from the current record and will need to unlink
   *
   * Categories can be created as a top level category, so there is always a possibility of null.
   *
   * @type {string}
   * @memberof ICategoryUpdate
   */
  parentId?: string;
}
