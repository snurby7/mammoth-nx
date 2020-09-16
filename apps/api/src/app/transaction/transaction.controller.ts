import { IDeleteResponse, ITransaction } from '@mammoth/api-interfaces'
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Observable } from 'rxjs'
import { TransactionCreateDto, TransactionDto, TransactionQueryDto } from './dto'
import { TransactionService } from './transaction.service'

@Controller('transaction')
@ApiTags('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @ApiOperation({
    summary: 'Create a single transaction and link it accordingly',
    description: `
      When a transaction is created this is going to first create the transaction. It will then go and link to the account,
      category, and payee. It will update the balances on those with the current inflow/outflow of the transaction.
      `,
  })
  @ApiResponse({
    status: 201,
    description: 'Returns back a single, newly created transaction',
  })
  @Post(':budgetId')
  @UseGuards(AuthGuard('jwt'))
  public createTransaction(
    @Param('budgetId') budgetId: string,
    @Body() request: TransactionCreateDto
  ): Observable<ITransaction> {
    if (budgetId !== request.budgetId) {
      throw new BadRequestException()
    }
    return this.transactionService.createTransaction(request)
  }

  @ApiOperation({
    summary: 'Query the transactions with a collection of Id values',
    description: 'Get the transactions that match the given query',
  })
  @ApiResponse({
    status: 201,
    description: 'Transactions that match some property on the ',
  })
  @Get(':budgetId/search')
  @UseGuards(AuthGuard('jwt'))
  public getTransactionsByQuery(
    @Param('budgetId') budgetId: string,
    @Query() query?: TransactionQueryDto
  ): Observable<ITransaction[]> {
    return this.transactionService.getTransactionsByQuery({ ...query, budgetId })
  }

  @ApiOperation({
    summary: 'Update a transaction',
    description: `
    Updates a given transaction and will re-establish any links it might have
    `,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns back the updated transactions with its properties and labels after being updated',
  })
  @Post(':budgetId/detail/:transactionId')
  @UseGuards(AuthGuard('jwt'))
  public updateTransaction(
    @Param('budgetId') budgetId: string,
    @Param('transactionId') transactionId: string,
    @Body() transactionData: TransactionDto
  ): Observable<ITransaction> {
    if (transactionData.budgetId !== budgetId || transactionData.id !== transactionId) {
      throw new BadRequestException()
    }
    return this.transactionService.updateTransaction$(transactionData)
  }

  @ApiOperation({
    summary: 'Delete a transaction',
    description: `
    This is going to remove a transaction and before it's completely gone it will grab what was there, refund all the links
    and then it will remove itself from the network.
    `,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns back a message saying how many nodes have been deleted. Data will need to refresh itself after making this request.',
  })
  @Delete(':budgetId/detail/:transactionId')
  @UseGuards(AuthGuard('jwt'))
  public deleteTransaction(
    @Param('budgetId') budgetId: string,
    @Param('transactionId') transactionId: string
  ): Observable<IDeleteResponse> {
    return this.transactionService.deleteTransaction$(budgetId, transactionId)
  }
}
