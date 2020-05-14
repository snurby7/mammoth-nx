export enum AccountApiRoute {
  GetAccounts = 'api/v1/accounts/:budgetId',
  GetAccountDetail = 'api/v1/accounts/:budgetId/detail/:accountId',
  DeleteAccount = 'api/v1/accounts/:budgetId/account/:accountId',
  CreateAccount = 'api/v1/accounts/:budgetId',
  UpdateAccount = 'api/v1/accounts/:budgetId/account/:accountId',
}
