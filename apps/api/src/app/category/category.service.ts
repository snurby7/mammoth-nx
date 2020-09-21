import {
  ICategory,
  ICategorySearchResponse,
  ICreateCategory,
  IDeleteResponse,
  ITransaction,
} from '@mammoth/api-interfaces'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map, materialize, toArray } from 'rxjs/operators'
import { NodeRelationship, SupportedLabel } from '../constants'
import {
  CommonAccountService,
  IAccountBalanceRequest,
  IAccountLinkedNodeMeta,
  IAccountLinkRequest,
  ICommonAccountConverter,
} from '../extensions'
import { getRecordsByKey, IMammothCoreNode, Neo4jService } from '../neo4j'
import { RxResult } from '../temp'
import { CreateCategory, UpdateCategory } from './dto'
import { categoryQueries } from './queries/category.queries'

/**
 * Category service is for handling all things category related.
 *
 * @export
 * @class CategoryService
 */
@Injectable()
export class CategoryService extends CommonAccountService implements ICommonAccountConverter {
  protected readonly logger = new Logger(CategoryService.name)

  constructor(protected neo4jService: Neo4jService) {
    super(neo4jService)
  }

  /**
   * This creates either a Child of a Category or a Top Level Category
   * Examples
   *   - Budget Node -> Category Node
   *   - Budget Node -> .... Child_Category -> Child_Category
   * @param {CreateCategory} request
   * @returns {Observable<ICategory>} Just the node that was created, currently doesn't return possible leafs.
   * @memberof CategoryService
   */
  public createCategory(request: CreateCategory): Observable<ICategory> {
    if (request.parentId) {
      return this.createChildCategory(request)
    }
    return this.createTopLevelCategory(request)
  }

  /**
   * This goes to Neo4J and matches all the nodes that match the following labels
   *   - Category
   * @param {string} BudgetId
   * @returns {Observable<ICategorySearchResponse[]>}
   * @memberof CategoryService
   */
  public findCategories(budgetId: string): Observable<ICategorySearchResponse[]> {
    const { query, params } = categoryQueries.getAllCategoriesByBudget(budgetId)
    return this.neo4jService.rxSession.readTransaction((trx) =>
      trx
        .run(query, params)
        .records()
        .pipe(
          materialize(),
          toArray(),
          map((response) =>
            response
              .reduce((arr, notification) => {
                const record = notification.value
                record?.keys.map((key) => {
                  const { parentNode, children } = record.get(key)
                  arr.push({
                    name: parentNode.properties.name,
                    budgetId: parentNode.properties.budgetId,
                    id: parentNode.properties.id,
                    children: children.details?.map((detail) => ({
                      ...detail.properties,
                    })),
                  })
                })
                return arr
              }, [] as ICategorySearchResponse[])
              .filter(
                (searchResponse) =>
                  searchResponse.budgetId ||
                  (searchResponse.children && searchResponse.children.length > 0)
              )
          )
        )
    )
  }

  /**
   * Goes to Neo4J and matches a single nodes that match the following labels
   *   - Category
   *   - Child_Category
   * @param {string} id The category Id to retrieve
   * @param {string} budgetId The budgetId that category is tied to.
   * @returns {Observable<ICategorySearchResponse>}
   * @memberof CategoryService
   */
  public getCategoryWithChildren(
    id: string,
    budgetId: string
  ): Observable<ICategorySearchResponse[]> {
    const { query, params } = categoryQueries.getCategoryWithChildrenById(id, budgetId)
    return this.neo4jService.rxSession.readTransaction((trx) =>
      trx
        .run(query, params)
        .records()
        .pipe(
          materialize(),
          toArray(),
          map((response) =>
            response
              .reduce((arr, notification) => {
                const record = notification.value
                record?.keys.map((key) => {
                  const { parentNode, children } = record.get(key)
                  arr.push({
                    name: parentNode.properties.name,
                    budgetId: parentNode.properties.budgetId,
                    id: parentNode.properties.id,
                    children: children.details?.map((detail) => ({
                      ...detail.properties,
                    })),
                  })
                })
                return arr
              }, [] as ICategorySearchResponse[])
              .filter(
                (searchResponse) =>
                  searchResponse.budgetId ||
                  (searchResponse.children && searchResponse.children.length > 0)
              )
          )
        )
    )
  }

  /**
   * If the node has a parentCategoryId it will first unlink the node, then it will relink that node
   * to the newly requested parent. If none of those hit, it will just update the properties on the node
   *
   * @param {string} id
   * @param {UpdateCategory} request
   * @returns {Promise<ICategory>}
   * @memberof CategoryService
   */
  public async updateCategory(request: UpdateCategory): Promise<ICategory> {
    const key = 'category'
    const { id, budgetId } = request
    const category = await this.getCategoryById(id, budgetId)

    if (!category) {
      throw new NotFoundException(`No category record exists with id - ${id}`)
    }
    // All relationships from the node are removed.
    await this.neo4jService.removeTargetedRelationshipFromNode(
      category.id,
      SupportedLabel.Category,
      NodeRelationship.CategoryOf
    )
    // Node is floating in space by this point

    const fromNode: IMammothCoreNode = {
      id: category.id,
      label: SupportedLabel.Category,
      budgetId: category.budgetId,
    }
    let toNode: IMammothCoreNode | null = null

    const hadExistingParentWithNewParentId =
      category.parentId !== null && category.parentId !== request.parentId && request.parentId

    if (hadExistingParentWithNewParentId || request.parentId) {
      toNode = {
        id: request.parentId,
        label: SupportedLabel.Category,
        budgetId: category.budgetId,
      }
      // * Pointing the category to the new relationship. This is a child of a category now
    } else {
      toNode = {
        id: request.budgetId,
        label: SupportedLabel.Budget,
        budgetId: category.budgetId,
      }
    }
    await this.neo4jService.createRelationshipBetweenNodes(
      fromNode,
      toNode,
      NodeRelationship.CategoryOf
    )

    /**
     * Need to do a update, the rest of the properties should already be fixed.
     */

    // Need to pick off the balance if there is one
    const balance = await this.getNodeBalance(fromNode)
    return await this.neo4jService
      .executeStatement({
        query: `
          MATCH (${key}:${SupportedLabel.Category} { id: $categoryId, budgetId: $budgetId})
          SET ${key} = $props
          RETURN ${key}
        `,
        params: {
          budgetId: request.budgetId,
          categoryId: request.id,
          props: { ...request, balance },
        },
      })
      .then((statementResult) => {
        const [result] = this.neo4jService.flattenStatementResult<ICategory>(statementResult, key)
        return result
      })
  }

  /**
   * Removes the node from the tree, this will rip the leaf from the tree and anyone below it.
   *
   * @param {string} id
   * @param {string} budgetId}
   * @returns {Observable<IDeleteResponse>}
   * @memberof CategoryService
   */
  public deleteCategory(categoryId: string, budgetId: string): Observable<IDeleteResponse> {
    const { query, params } = categoryQueries.deleteCategory(categoryId, budgetId)
    return this.neo4jService.rxSession.writeTransaction((trx) =>
      ((trx.run(query, params) as unknown) as RxResult).consume().pipe(
        map((result) => ({
          message: `Deleted ${result.counters.updates().nodesDeleted || 0} record(s)`,
          id: categoryId,
          isDeleted: result.counters.updates().nodesDeleted > 0,
        }))
      )
    )
  }

  /**
   * Creates only a top level node that is linked to the budget node
   *
   * @private
   * @param {ICreateCategory} request
   * @returns {Observable<ICategory>}
   * @memberof CategoryService
   */
  private createTopLevelCategory(request: ICreateCategory): Observable<ICategory> {
    const resultKey = 'category'
    const { query, params } = categoryQueries.createCategory(resultKey, request)
    return this.neo4jService.rxSession.writeTransaction((trx) =>
      trx.run(query, params).records().pipe(getRecordsByKey<ICategory>(resultKey))
    )
  }

  /**
   * Creates a child category of N levels deep as long as it can find the parent.
   * Budget -> Category -> ... -> Child_Category
   *
   * @private
   * @param {ICreateCategory} request
   * @returns {Observable<ICategory>}
   * @memberof CategoryService
   */
  private createChildCategory(request: ICreateCategory): Observable<ICategory> {
    const resultKey = 'childCategory'
    const { query, params } = categoryQueries.createChildCategory(resultKey, request)
    return this.neo4jService.rxSession.writeTransaction((trx) =>
      trx.run(query, params).records().pipe(getRecordsByKey<ICategory>(resultKey))
    )
  }

  /**
   * Internal method to just get the category meta data, this is not exposed to anyone right now. This is used to get the data that is stored in
   * the database.
   *
   * @private
   * @param {string} categoryId
   * @param {string} budgetId
   * @returns {Promise<ICategory>}
   * @memberof CategoryService
   */
  private getCategoryById(categoryId: string, budgetId: string): Promise<ICategory> {
    const resultKey = 'category'
    const { query, params } = categoryQueries.getCategoryNode(resultKey, categoryId, budgetId)
    // TODO This is still entangled in the method up above in updateCategory
    return this.neo4jService.rxSession
      .readTransaction((trx) =>
        trx.run(query, params).records().pipe(getRecordsByKey<ICategory>(resultKey))
      )
      .toPromise()
  }

  /**
   * Converts the transaction into something that can be used to reference an Account
   *
   * @param {ITransaction} transaction Transaction to scrape data out of
   * @param {number} transactionAmount The transaction amount (+, -, 0)
   * @returns {IAccountLinkedNodeMeta}
   * @memberof CategoryService
   */
  public convertTransactionToAccountLink(
    transaction: ITransaction,
    transactionAmount: number
  ): IAccountLinkedNodeMeta {
    return {
      id: transaction.categoryId,
      label: SupportedLabel.Category,
      budgetId: transaction.budgetId,
      amount: transactionAmount,
    }
  }

  /**
   * Convert a stored transaction and it's updated request to a LinkResponse
   *
   * @param {ITransaction} currentTransaction
   * @param {ITransaction} transactionUpdateRequest
   * @param {string} linkingRelationship
   * @returns {IAccountLinkResponse}
   * @memberof CategoryService
   */
  public convertToAccountLinkResponse(
    currentTransaction: ITransaction,
    transactionUpdateRequest: ITransaction,
    linkingRelationship: string,
    currentTransactionAmount: number,
    updatedTransactionRequestAmount: number
  ): IAccountLinkRequest {
    const currentNodeRelationship: IAccountBalanceRequest = {
      id: currentTransaction.categoryId,
      label: SupportedLabel.Category,
      isBalanceDifferent:
        currentTransaction.inflow !== transactionUpdateRequest.inflow ||
        currentTransaction.outflow !== transactionUpdateRequest.outflow,
      chargeAmount: updatedTransactionRequestAmount,
      refundAmount: -currentTransactionAmount,
      budgetId: currentTransaction.budgetId,
    }

    return {
      storedTransactionDetails: {
        id: currentTransaction.id,
        label: SupportedLabel.Transaction,
        budgetId: currentTransaction.budgetId,
        relationship: linkingRelationship,
        balanceRequest: currentNodeRelationship,
      },
      currentTransactionLinkDetails: {
        id: currentTransaction.categoryId,
        amount: -currentTransactionAmount, // invert the current amount to refund it
        label: SupportedLabel.Category,
        budgetId: currentTransaction.budgetId,
      },
      newLinkDetails: {
        id: transactionUpdateRequest.categoryId,
        amount: updatedTransactionRequestAmount,
        label: SupportedLabel.Category,
        budgetId: transactionUpdateRequest.budgetId,
      },
    }
  }
}
