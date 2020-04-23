import { IBaseSearchQuery } from '../generic'

/**
 * Query object to run a search over the budget nodes
 *
 * @export
 * @interface IBudgetQuery
 */
export interface IBudgetQuery extends Omit<IBaseSearchQuery, 'budgetId'> {
  /**
   * TODO: Enable additional props for IBudgetQuery - https://3.basecamp.com/4326074/buckets/14452756/todos/2444425808
   */
}
