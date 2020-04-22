/**
 * The interface to implement whenever a category is to be updated
 *
 * @export
 * @interface ICategoryUpdate
 */
export interface ICategoryUpdate {
  /**
   * Id of the category you wish to update
   *
   * @example cf16edb8-0d46-4c41-af40-0ea983423de8
   * @type {string}
   * @memberof ICategoryUpdate
   */
  id: string;

  /**
   * Id of the budget that this category is under for targeted queries
   *
   * @example d20cafd5-4648-4834-9749-8d34b22d41bf
   * @type {string}
   * @memberof ICategoryUpdate
   */
  budgetId: string;

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
