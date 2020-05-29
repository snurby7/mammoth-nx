import { ICoreNode } from '@mammoth/api-core';

/**
 * Used to create a budget
 *
 * @export
 * @interface ICreateBudget
 */
export interface ICreateBudget extends Omit<ICoreNode, 'id' | 'budgetId'> {
  /**
   * Name of the budget
   *
   * @example "Money Pit"
   * @type {string}
   * @memberof ICreateBudget
   */
  name: string;
}
