import { ICreatePayee, IPayee } from '@mammoth/api-interfaces'
import { axiosInstance, replaceKeyPlaceholders } from '../../utils'

enum ApiRoute {
  LoadPayees = '/api/v1/payee/:budgetId',
  CreatePayee = '/api/v1/payee/:budgetId',
}

class PayeeApi {
  public async loadPayees(budgetId: string): Promise<IPayee[]> {
    const response = await axiosInstance.get<IPayee[]>(
      replaceKeyPlaceholders(ApiRoute.LoadPayees, { budgetId })
    )
    return response.data
  }

  public async createPayee(request: ICreatePayee): Promise<IPayee> {
    const response = await axiosInstance.post<IPayee>(
      replaceKeyPlaceholders(ApiRoute.CreatePayee, { budgetId: request.budgetId }),
      request
    )
    return response.data
  }
}
export const payeeApi = new PayeeApi()
