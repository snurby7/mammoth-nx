import { ITransaction } from '@mammoth/api-interfaces';
import {
  Controller,

  Get,



  NotImplementedException, Param,

  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { TransactionService } from './transaction.service';

@Controller('transaction')
@ApiTags('transaction-search')
export class TransactionSearchController {
  constructor(private transactionService: TransactionService) { }

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
    @Param('accountId') accountId: string,
  ): Observable<ITransaction[]> {
    throw new NotImplementedException();
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
    @Param('payeeId') payeeId: string,
  ): Observable<ITransaction[]> {
    throw new NotImplementedException();
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
    @Param('categoryId') categoryId: string,
  ): Observable<ITransaction[]> {
    throw new NotImplementedException();
  }
}
