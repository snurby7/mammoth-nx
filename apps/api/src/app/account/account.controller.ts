import { IAccount, IDeleteResponse } from '@mammoth/api-interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccount, UpdateAccount } from './dto';

@Controller('accounts')
@ApiTags('account')
export class AccountController {
  private readonly logger = new Logger(AccountController.name);
  constructor(private readonly accountService: AccountService) {}

  @Post(':budgetId')
  @ApiOperation({
    summary: 'Create Account',
    description:
      'Creates an account, a account is a top level node for the system.',
  })
  @ApiResponse({
    status: 201,
    description: 'The newly created account is returned',
  })
  @UseGuards(AuthGuard('jwt'))
  public async createNewAccount(
    @Param('budgetId') budgetId: string,
    @Body() accountRequest: CreateAccount
  ): Promise<IAccount> {
    if (!accountRequest.budgetId || accountRequest.budgetId !== budgetId) {
      this.logger.error('No budgetId found on request');
      throw new HttpException(
        'No budgetId found on request',
        HttpStatus.CONFLICT
      );
    }
    return await this.accountService.createAccount(accountRequest);
  }

  @Get(':budgetId')
  @ApiOperation({
    summary: 'Find all accounts',
    description: 'Get all the accounts that have Account as its label',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of all accounts and their properties and labels.',
  })
  @UseGuards(AuthGuard('jwt'))
  public async getAllAccountsForBudgetId(
    @Param('budgetId') budgetId: string
  ): Promise<IAccount[]> {
    return await this.accountService.findAccounts({
      budgetId,
    });
  }

  @Get(':budgetId/detail/:accountId')
  @ApiOperation({
    summary: 'Find a single account',
    description: 'Get a specific account by the accountId in a given budgetId',
  })
  @ApiResponse({
    status: 200,
    description: 'A single account and its properties and labels',
  })
  @UseGuards(AuthGuard('jwt'))
  public async getAccount(
    @Param('budgetId') budgetId: string,
    @Param('accountId') id: string
  ): Promise<IAccount> {
    return await this.accountService.findAccount(budgetId, id);
  }

  @Post(':budgetId/detail/:accountId')
  @ApiOperation({
    summary: 'Update a given account',
    description:
      'Update a single account, currently only updates the name property and everything else remains the same',
  })
  @UseGuards(AuthGuard('jwt'))
  public async updateAccountDetails(
    @Param('budgetId') budgetId: string,
    @Param('accountId') id: string,
    @Body() updateAccount: UpdateAccount
  ): Promise<IAccount> {
    if (id !== updateAccount.id && budgetId !== updateAccount.budgetId) {
      throw new HttpException(
        'The parameter id and the body id do not match.',
        HttpStatus.CONFLICT
      );
    }
    return await this.accountService.saveAccount(updateAccount);
  }

  @ApiOperation({
    summary: 'Delete an account',
    description: `
      This will delete an account.
    `,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns back a message saying how many nodes have been deleted. Data will need to refresh itself after making this request.',
  })
  @Delete(':budgetId/account/:accountId')
  @UseGuards(AuthGuard('jwt'))
  public async deleteAccount(
    @Param('budgetId') budgetId: string,
    @Param('accountId') accountId: string
  ): Promise<IDeleteResponse> {
    return await this.accountService.deleteAccount(budgetId, accountId);
  }
}
