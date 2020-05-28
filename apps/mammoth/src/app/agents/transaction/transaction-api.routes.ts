export enum TransactionApiRoute {
  CreateTransaction = 'api/v1/transaction/:budgetId',
  GetTransactions = 'api/v1/transaction/:budgetId',
  UpdateTransactionDetail = 'api/v1/transaction/:budgetId/detail/:transactionId',
  DeleteTransactionDetail = 'api/v1/transaction/:budgetId/detail/:transactionId',
}
