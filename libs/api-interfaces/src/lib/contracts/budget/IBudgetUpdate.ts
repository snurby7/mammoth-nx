import { IBudget } from './IBudget';

/**
 * Interface that is used whenever a new budget is updated
 *
 * @export
 * @interface IBudgetUpdate
 * @extends {Omit<IBudget, 'startDate'>}
 */
export interface IBudgetUpdate extends Omit<IBudget, 'startDate'> {}
