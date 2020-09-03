import { IPayee, IPayeeCreate } from '@mammoth/api-interfaces'
import { axiosInstance, replaceKeyPlaceholders } from '../../utils'

enum ApiRoute {
  LoadPayees = '/api/v1/payee/budget/:budgetId', // TODO The Payee API needs updating!
  CreatePayee = '/api/v1/payee',
}

class PayeeApi {
  public async loadPayees(budgetId: string): Promise<IPayee[]> {
    const response = await axiosInstance.get<IPayee[]>(
      replaceKeyPlaceholders(ApiRoute.LoadPayees, { budgetId })
    )
    return response.data
  }

  public async createPayee(request: IPayeeCreate): Promise<IPayee> {
    const response = await axiosInstance.post<IPayee>(ApiRoute.CreatePayee, request)
    return response.data
  }
}
export const payeeApi = new PayeeApi()
