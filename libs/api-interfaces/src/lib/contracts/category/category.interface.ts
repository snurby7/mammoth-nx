import { ICoreNode } from '@mammoth/api-core';

/**
 * Base Implementation of a category
 *
 * @export
 * @interface ICategory
 */
export interface ICategory extends ICoreNode {
  /**
   * Name of the category
   *
   * @example Get-away Fund
   * @type {string}
   * @memberof ICategory
   */
  name: string;

  /**
   * Property used if a category is a child, this can go quite deep.
   *
   * @type {string}
   * @memberof ICategory
   */
  parentId?: string;
}
