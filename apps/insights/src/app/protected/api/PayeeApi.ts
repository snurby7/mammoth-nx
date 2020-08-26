import { IPayee } from '@mammoth/api-interfaces'
import { axiosInstance, replaceKeyPlaceholders } from '../../utils'

enum ApiRoute {
  LoadPayees = '/api/v1/payee/budget/:budgetId', // TODO The Payee API needs updating!
}

class PayeeApi {
  public async loadPayees(budgetId: string): Promise<IPayee[]> {
    const response = await axiosInstance.get<IPayee[]>(
      replaceKeyPlaceholders(ApiRoute.LoadPayees, { budgetId })
    )
    return response.data
  }
}
export const payeeApi = new PayeeApi()
