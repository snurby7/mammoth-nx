import { ITransaction,IDeleteResponse } from '@mammoth/api-interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  TransactionCreateDto,
  TransactionDeleteDto,
  TransactionDto,
  TransactionQueryDto,
} from './dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
@ApiTags('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
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
  public createTransaction(
    @Body() request: TransactionCreateDto
  ): Observable<ITransaction> {
    return this.transactionService.createTransaction(request);
  }

  @Get()
  @ApiOperation({
    summary: 'Query the transactions with a collection of Id values',
    description: 'Get the transactions that match the given query',
  })
  @ApiResponse({
    status: 201,
    description: 'Transactions that match some property on the ',
  })
  @UseGuards(AuthGuard('jwt'))
  public getTransactionsByQuery(
    @Body() query: TransactionQueryDto
  ): Observable<ITransaction[]> {
    return this.transactionService.getTransactionsByQuery(query);
  }

  @Put()
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
    @UseGuards(AuthGuard('jwt'))
  public updateTransaction(
    @Body() transactionData: TransactionDto
  ): Observable<ITransaction> {
    return this.transactionService.updateTransaction$(transactionData);
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
  @Delete()
  @UseGuards(AuthGuard('jwt'))
  public deleteTransaction(
    @Body() request: TransactionDeleteDto
  ): Observable<IDeleteResponse> {
    return this.transactionService.deleteTransaction$(request);
  }
}
