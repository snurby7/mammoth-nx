import { ICategory, ICreateCategory } from '@mammoth/api-interfaces'
import { BehaviorSubject, Observable } from 'rxjs'
import { categoryApi } from '../../api'
import { Category } from './Category'

class RxCategoryApi {
  private categoryMap: Map<string, Category> = new Map()
  private categoryIds = new BehaviorSubject<string[]>([])

  public get categoryIdList$(): Observable<string[]> {
    return this.categoryIds.asObservable()
  }

  public readonly defaultCategory: ICategory = {
    name: '',
    id: '',
    budgetId: '',
  }

  /**
   *
   *
   * @param {string} budgetId
   * @memberof RxCategoryApi
   */
  public async loadCategories(budgetId: string) {
    const categories = await categoryApi.loadCategories(budgetId)
    const categoryIds: string[] = []
    categories.forEach((category) => {
      categoryIds.push(category.id)
      this.categoryMap.set(category.id, new Category(category))
    })
    this.categoryIds.next(categoryIds)
  }

  /**
   *
   *
   * @param {ICreateCategory} category
   * @returns {Promise<Category>}
   * @memberof RxCategoryApi
   */
  public async createCategory(category: ICreateCategory): Promise<Category> {
    throw new Error('Method not implemented.')
  }

  /**
   *
   *
   * @param {string} categoryId
   * @returns {Category}
   * @memberof RxCategoryApi
   */
  public getCategory(categoryId: string): Category {
    const category = this.categoryMap.get(categoryId)
    if (!category) {
      throw Error(`No Category found to match key - ${categoryId}`)
    }
    return category
  }
}

export const rxCategoryApi = new RxCategoryApi()
