import { IDateRangeSearchQuery, ITransactionDetail } from '@mammoth/api-interfaces'
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Observable } from 'rxjs'
import { toMonthBoundary } from '../../utils'
import { TransactionSearchService } from './transaction-search.service'

@Controller('transaction')
@ApiTags('transaction-search')
export class TransactionSearchController {
  constructor(private transactionSearchService: TransactionSearchService) {}

  @ApiOperation({
    summary: 'Query the transactions that are linked to a given account',
    description: 'Get the transactions relate to the account',
  })
  @ApiResponse({
    status: 201,
    description: 'Transactions that are linked to the accountId',
  })
  @Get(':budgetId/account/:accountId')
  @UseGuards(AuthGuard('jwt'))
  public getTransactionsForAccount(
    @Param('budgetId') budgetId: string,
    @Param('accountId') accountId: string
  ): Observable<ITransactionDetail[]> {
    return this.transactionSearchService.getTransactionsByAccount(budgetId, accountId)
  }

  @ApiOperation({
    summary: 'Query the transactions that are linked to a given payee',
    description: 'Get the transactions relate to the payee',
  })
  @ApiResponse({
    status: 201,
    description: 'Transactions that are linked to the payeeId',
  })
  @Get(':budgetId/payee/:payeeId')
  @UseGuards(AuthGuard('jwt'))
  public getTransactionsForPayee(
    @Param('budgetId') budgetId: string,
    @Param('payeeId') payeeId: string
  ): Observable<ITransactionDetail[]> {
    return this.transactionSearchService.getTransactionsByPayee(budgetId, payeeId)
  }

  @ApiOperation({
    summary: 'Query the transactions that are linked to a given category',
    description: 'Get the transactions relate to the category',
  })
  @ApiResponse({
    status: 201,
    description: 'Transactions that are linked to the categoryId',
  })
  @Get(':budgetId/category/:categoryId')
  @UseGuards(AuthGuard('jwt'))
  public getTransactionsForCategory(
    @Param('budgetId') budgetId: string,
    @Param('categoryId') categoryId: string
  ): Observable<ITransactionDetail[]> {
    return this.transactionSearchService.getTransactionByCategory(budgetId, categoryId)
  }

  @ApiOperation({
    summary: 'Query the transactions between two dates in time',
    description: 'Get the transactions between two dates',
  })
  @ApiResponse({
    status: 201,
    description: 'Transactions that are between two dates',
  })
  @Get(':budgetId/search')
  @UseGuards(AuthGuard('jwt'))
  public getTransactionsByQuery(
    @Param('budgetId') budgetId: string,
    @Query() query: IDateRangeSearchQuery
  ): Observable<ITransactionDetail[]> {
    return this.transactionSearchService.getTransactionsByDateBoundary(
      budgetId,
      toMonthBoundary(query)
    )
  }
}
