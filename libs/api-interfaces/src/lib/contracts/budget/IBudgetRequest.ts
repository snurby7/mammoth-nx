/**
 * Used to create a budget
 *
 * @export
 * @interface IBudgetRequest
 */
export interface IBudgetRequest {
  /**
   * Name of the budget
   *
   * @example "Money Pit"
   * @type {string}
   * @memberof IBudgetRequest
   */
  name: string;
}

/**
 * TODO: This will need to add a user id, so it can be created for a certain user
 * TODO: Add more configuration to the budget later. So things like currency, formats, etc.
 */
