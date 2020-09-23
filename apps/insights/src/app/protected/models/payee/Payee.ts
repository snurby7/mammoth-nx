import { IPayee } from '@mammoth/api-interfaces'

export class Payee {
  public get detailRef(): IPayee {
    return this.details
  }
  constructor(private details: IPayee) {}
}
