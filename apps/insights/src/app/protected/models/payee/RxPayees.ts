import { ICreatePayee, IPayee } from '@mammoth/api-interfaces'
import { BehaviorSubject, Observable } from 'rxjs'
import { payeeApi } from '../../api'
import { Payee } from './Payee'

class RxPayeeApi {
  private payeeMap: Map<string, Payee> = new Map()
  private payeeIds = new BehaviorSubject<string[]>([])

  public get payeeIdList$(): Observable<string[]> {
    return this.payeeIds.asObservable()
  }

  public readonly defaultPayee: IPayee = {
    name: '',
    id: '',
    budgetId: '',
  }

  /**
   *
   *
   * @param {string} budgetId
   * @memberof RxPayeeApi
   */
  public async loadPayees(budgetId: string) {
    const payees = await payeeApi.loadPayees(budgetId)
    const payeeIds: string[] = []
    payees.forEach((payee) => {
      payeeIds.push(payee.id)
      this.payeeMap.set(payee.id, new Payee(payee))
    })
    this.payeeIds.next(payeeIds)
  }

  /**
   *
   *
   * @param {ICreatePayee} payee
   * @returns {Promise<Payee>}
   * @memberof RxPayeeApi
   */
  public async createPayee(payee: ICreatePayee): Promise<Payee> {
    throw new Error('Method not implemented.')
  }

  /**
   *
   *
   * @param {string} payeeId
   * @returns {Payee}
   * @memberof RxPayeeApi
   */
  public getPayee(payeeId: string): Payee {
    const payee = this.payeeMap.get(payeeId)
    if (!payee) {
      throw Error(`No Payee found to match key - ${payeeId}`)
    }
    return payee
  }
}

export const rxPayeeApi = new RxPayeeApi()
