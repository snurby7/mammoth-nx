/**
 * Base Implementation of a category
 *
 * @export
 * @interface ICategory
 */
export interface ICategory {
  /**
   * Name of the category
   *
   * @example Get-away Fund
   * @type {string}
   * @memberof ICategory
   */
  name: string;

  /**
   * Generated Id to be used to find the given Category in the budget easily
   *
   * @type {string}
   * @memberof ICategory
   */
  id: string;

  /**
   * Property used if a category is a child, this can go quite deep.
   *
   * @type {string}
   * @memberof ICategory
   */
  parentId?: string;

  /**
   * BudgetId associated with the record
   *
   * @example aa866183-adad-41c9-9314-f8c33d714c3b
   * @type {string}
   * @memberof ICategory
   */
  budgetId: string;
}
