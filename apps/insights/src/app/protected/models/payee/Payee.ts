import { IFormattedNode, IPayee } from '@mammoth/api-interfaces'

export class Payee {
  public get detailRef(): IPayee {
    return this.details
  }

  public get formattedNode(): IFormattedNode {
    return { id: this.details.id, value: this.details.name }
  }

  public get displayValue(): string {
    return this.details.name
  }

  constructor(private details: IPayee) {}
}
