import { IBudget, IDeleteResponse } from '@mammoth/api-interfaces'
import { Injectable, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map, materialize, toArray } from 'rxjs/operators'
import { getRecordsByKey, getRecordsByKeyNotification, Neo4jService } from '../neo4j'
import { Budget, BudgetQuery, UpdateBudget } from './dto'
import {
  deleteBudgetById,
  getBudgetById,
  getBudgetsByQuery,
  getCreateBudgetStatement,
  updateBudgetRequest,
} from './queries'

@Injectable()
export class BudgetService {
  private readonly logger = new Logger(BudgetService.name)

  constructor(private neo4jService: Neo4jService) {}

  /**
   * @description Creates a budget node, all things are children of this.
   * @param {ICreateBudget} request
   * @returns {Promise<IBudget>}
   * @memberof BudgetService
   */
  public createBudget(request: Budget): Observable<IBudget> {
    const node = 'createdBudget'
    const { statement, props } = getCreateBudgetStatement(node, request)
    return this.neo4jService.rxSession.writeTransaction((trx) =>
      trx.run(statement, props).records().pipe(
        getRecordsByKey<IBudget>(node) // this knowingly only grabs the first record, only one should be emitted here
      )
    )
  }

  /**
   * Get budgets, there is a limit option that can be used, currently it justs gets all nodes that match the
   * Budget label
   *
   * @param {BudgetQuery} query
   * @returns {Observable<IBudget[]>}
   * @memberof BudgetService
   */
  public queryBudgets(query: BudgetQuery): Observable<IBudget[]> {
    const resultKey = 'budgets'
    const { statement } = getBudgetsByQuery(resultKey, query)
    return this.neo4jService.rxSession.readTransaction((trx) =>
      trx.run(statement).records().pipe(
        materialize(), // gather all the notifications from the stream
        toArray(), // turn them all into an array
        getRecordsByKeyNotification(resultKey) // * Grab results
      )
    )
  }

  /**
   * Finds a budget by the ID passed.
   *
   * @param {string} id
   * @returns {Observable<IBudget>}
   * @memberof BudgetService
   */
  public getBudget(id: string): Observable<IBudget> {
    const resultKey = 'budget'
    const { statement, props } = getBudgetById(resultKey, id)
    return this.neo4jService.rxSession.readTransaction((trx) =>
      trx.run(statement, props).records().pipe(
        getRecordsByKey<IBudget>(resultKey) // this knowingly only grabs the first record, only one should be emitted here
      )
    )
  }

  /**
   * Deletes a budget node and will orphan all of the children underneath it.
   * TODO: Whenever a budget deletes, need to destroy all linked nodes to it.
   *
   * @param {string} id
   * @returns {Observable<IDeleteResponse>}
   * @memberof BudgetService
   */
  public deleteBudget(id: string): Observable<IDeleteResponse> {
    this.logger.debug(`Deleting budget - ${id}`)
    const { statement, props } = deleteBudgetById(id)

    return this.neo4jService.rxSession.writeTransaction((trx) =>
      trx
        .run(statement, props)
        .summary()
        .pipe(
          map((result) => ({
            message: `Deleted ${result.counters.updates().nodesDeleted || 0} record(s)`,
            id,
            isDeleted: result.counters.updates().nodesDeleted > 0,
          }))
        )
    )
  }

  /**
   * This will just update the name on a budget, there will be more work to this as the project grows, but for now
   * it will update the name on a budget.
   *
   * @param {UpdateBudget} request
   * @returns {Observable<IBudget>}
   * @memberof BudgetService
   */
  public saveBudget(request: UpdateBudget): Observable<IBudget> {
    const budgetKey = 'budget'
    const { statement, props } = updateBudgetRequest(budgetKey, request)
    return this.neo4jService.rxSession.writeTransaction((trx) =>
      trx.run(statement, props).records().pipe(getRecordsByKey<IBudget>(budgetKey))
    )
  }
}
