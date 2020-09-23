import { ICategory } from '@mammoth/api-interfaces'

export class Category {
  public get detailRef(): ICategory {
    return this.details
  }
  constructor(private details: ICategory) {}
}
