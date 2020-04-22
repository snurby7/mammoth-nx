/**
 * Interface that is used after a budget has been created
 *
 * @export
 * @interface IBudget
 */
export interface IBudget {
  /**
   * Unique ID for the budget
   *
   * @type {string}
   * @memberof IBudget
   */
  id: string;

  /**
   * The nicely formatted name of the budget
   *
   * @type {string}
   * @memberof IBudget
   */
  name: string;

  /**
   * Date the budget was started
   *
   * @type {string}
   * @memberof IBudget
   */
  startDate: string;
}
