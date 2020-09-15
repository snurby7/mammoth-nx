import {
  ICategory,
  ICategorySearchResponse,
  ICreateCategory,
  ITransaction,
} from '@mammoth/api-interfaces'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { NodeRelationship, SupportedLabel } from '../constants'
import {
  CommonAccountService,
  IAccountBalanceRequest,
  IAccountLinkedNodeMeta,
  IAccountLinkRequest,
  ICommonAccountConverter,
} from '../extensions'
import { getRecordsByKey, IMammothCoreNode, Neo4jService } from '../neo4j'
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
   * @returns {Promise<ICategorySearchResponse[]>}
   * @memberof CategoryService
   */
  public async findCategories(budgetId: string): Promise<ICategorySearchResponse[]> {
    const statementResult = await this.neo4jService.executeStatement({
      statement: `
        MATCH (parent:${SupportedLabel.Category} {budgetId: $budgetId})
        OPTIONAL MATCH (parent)<-[:${NodeRelationship.CategoryOf}]-(child)
        RETURN {
          parentNode: parent,
          children: {details :collect(child)}
        }
        `,
      props: {
        budgetId,
      },
    })
    return this.neo4jService
      .flattenOptionalMatch<ICategorySearchResponse>(statementResult)
      .filter((node) => node.budgetId || (node.children && node.children.length > 0))
    // * filter out the nodes with no children, they're collected via their parent.
  }

  /**
   * Goes to Neo4J and matches a single nodes that match the following labels
   *   - Category
   *   - Child_Category
   * @param {string} id
   * @param {string} budgetId
   * @returns {Promise<ICategorySearchResponse>}
   * @memberof CategoryService
   */
  public async findCategory(id: string, budgetId: string): Promise<ICategorySearchResponse[]> {
    const nodeParent = 'category'
    const nodeChild = 'categoryChild'
    return await this.neo4jService
      .executeStatement({
        statement: `
          MATCH (${nodeParent}:Category {id: $id, budgetId: $budgetId})
          OPTIONAL MATCH (${nodeParent})<-[:${NodeRelationship.CategoryOf}]-(${nodeChild})
          WITH COLLECT (${nodeChild}) + ${nodeParent} AS all
          UNWIND all as ${nodeParent}
          MATCH (${nodeParent})
          OPTIONAL MATCH (${nodeParent})<-[:${NodeRelationship.CategoryOf}]-(${nodeChild})
          RETURN {
            parentNode: ${nodeParent},
            children : {details :collect(${nodeChild})}
          }
        `,
        props: {
          id,
          budgetId,
        },
      })
      .then((result) => this.neo4jService.flattenOptionalMatch<ICategorySearchResponse>(result))
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
        statement: `
          MATCH (${key}:${SupportedLabel.Category} { id: $categoryId, budgetId: $budgetId})
          SET ${key} = $props
          RETURN ${key}
        `,
        props: {
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
   * @returns {Promise<{ message: string }>}
   * @memberof CategoryService
   */
  public async deleteCategory(id: string): Promise<{ message: string }> {
    const result = await this.neo4jService.executeStatement({
      statement: `
        MATCH (node:${SupportedLabel.Category} { id: '${id}' })
        DETACH DELETE node
      `,
    })
    return {
      message: `Deleted ${result.summary.counters.updates().nodesDeleted || 0} record(s)`,
    }
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
    const { statement, props } = categoryQueries.createCategory(resultKey, request)
    return this.neo4jService.rxSession.writeTransaction((trx) =>
      trx.run(statement, props).records().pipe(getRecordsByKey<ICategory>(resultKey))
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
    const { statement, props } = categoryQueries.createChildCategory(resultKey, request)
    return this.neo4jService.rxSession.writeTransaction((trx) =>
      trx.run(statement, props).records().pipe(getRecordsByKey<ICategory>(resultKey))
    )
  }

  /**
   * Internal method to just get the category meta data, this is not exposed to anyone right now. This is used to get the data that is stored in
   * the database.
   *
   * @private
   * @param {string} id
   * @param {string} budgetId
   * @returns {Promise<ICategory>}
   * @memberof CategoryService
   */
  private async getCategoryById(id: string, budgetId: string): Promise<ICategory> {
    return await this.neo4jService
      .executeStatement({
        statement: `
        MATCH (category:${SupportedLabel.Category} {id: $id, budgetId: $budgetId})
        RETURN category
      `,
        props: {
          id,
          budgetId,
        },
      })
      .then((result) => {
        const [category] = this.neo4jService.flattenStatementResult<ICategory>(result, 'category')
        return category
      })
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
