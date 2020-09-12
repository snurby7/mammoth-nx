import { IDateRangeSearchQuery, ITransactionDetail } from '@mammoth/api-interfaces'
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Observable, of } from 'rxjs'
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

  @Get(':budgetId/search')
  @UseGuards(AuthGuard('jwt'))
  public getTransactionsByQuery(
    @Param('budgetId') budgetId: string,
    @Query() query: IDateRangeSearchQuery
  ): Observable<ITransactionDetail[]> {
    console.log(query)
    return of([])
  }
}
