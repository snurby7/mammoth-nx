import { IBudget } from './budget.interface';

/**
 * Interface that is used whenever a new budget is updated
 *
 * @export
 * @interface IUpdateBudget
 * @extends {Omit<IBudget, 'startDate'>}
 */
export interface IUpdateBudget
  extends Omit<IBudget, 'startDate' | 'createdDate'> {}
