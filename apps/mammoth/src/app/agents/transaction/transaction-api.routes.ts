export enum TransactionApiRoute {
  CreateTransaction = 'api/v1/transaction/:budgetId',
  GetTransactions = 'api/v1/transaction/:budgetId/search',
  UpdateTransactionDetail = 'api/v1/transaction/:budgetId/detail/:transactionId',
  DeleteTransactionDetail = 'api/v1/transaction/:budgetId/detail/:transactionId',
  GetTransactionsByAccount = 'api/v1/transaction/:budgetId/account/:accountId',
  GetTransactionsByPayee = 'api/v1/transaction/:budgetId/payee/:payeeId',
  GetTransactionsByCategory = 'api/v1/transaction/:budgetId/category/:categoryId',
}
