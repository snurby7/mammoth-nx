import { ICategory, IFormattedNode } from '@mammoth/api-interfaces'

export class Category {
  public get detailRef(): ICategory {
    return this.details
  }

  public get formattedNode(): IFormattedNode {
    return { id: this.details.id, value: this.details.name }
  }
  constructor(private details: ICategory) {}
}
