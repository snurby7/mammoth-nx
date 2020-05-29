import { ITransaction } from '@mammoth/api-interfaces';
import {
  Controller,
  NotImplementedException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { TransactionSearchService } from './transaction-search.service';

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
  @Post(':budgetId/account/:accountId')
  // @UseGuards(AuthGuard('jwt'))
  public getTransactionsForAccount(
    @Param('budgetId') budgetId: string,
    @Param('accountId') accountId: string
  ): Observable<ITransaction[]> {
    return this.transactionSearchService.getTransactionsByAccount(
      budgetId,
      accountId
    );
  }

  @ApiOperation({
    summary: 'Query the transactions that are linked to a given payee',
    description: 'Get the transactions relate to the payee',
  })
  @ApiResponse({
    status: 201,
    description: 'Transactions that are linked to the payeeId',
  })
  @Post(':budgetId/payee/:payeeId')
  @UseGuards(AuthGuard('jwt'))
  public getTransactionsForPayee(
    @Param('budgetId') budgetId: string,
    @Param('payeeId') payeeId: string
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
  @Post(':budgetId/category/:categoryId')
  @UseGuards(AuthGuard('jwt'))
  public getTransactionsForCategory(
    @Param('budgetId') budgetId: string,
    @Param('categoryId') categoryId: string
  ): Observable<ITransaction[]> {
    throw new NotImplementedException();
  }
}
