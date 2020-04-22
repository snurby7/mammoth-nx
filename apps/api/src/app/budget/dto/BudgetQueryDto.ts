import { IBudgetQuery } from '../../common'

/**
 * Query object to get a set list of budgets
 *
 * @export
 * @class BudgetQueryDto
 * @implements {IBudgetQuery}
 */
export class BudgetQueryDto implements IBudgetQuery {
  limit?: number
}
