import { IAccount } from '@mammoth/api-interfaces';
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
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { AccountQuery, CreateAccount, UpdateAccount } from './dto';

@Controller('account')
@ApiTags('account')
export class AccountController {
  private readonly logger = new Logger(AccountController.name);
  constructor(private readonly accountService: AccountService) {}

  @Post()
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
  public async createAccount(
    @Body() accountRequest: CreateAccount
  ): Promise<IAccount> {
    if (!accountRequest.budgetId) {
      this.logger.error('No budgetId found on request');
      throw new HttpException(
        'No budgetId found on request',
        HttpStatus.CONFLICT
      );
    }
    return await this.accountService.createAccount(accountRequest);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all accounts',
    description: 'Get all the accounts that have Account as its label',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of all accounts and their properties and labels.',
  })
  @UseGuards(AuthGuard('jwt'))
  public async getAllAccounts(
    @Body() query?: AccountQuery
  ): Promise<IAccount[]> {
    return await this.accountService.findAccounts(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a single account',
    description: 'Get a account that has Account as its label',
  })
  @ApiResponse({
    status: 200,
    description: 'A single account and its properties and labels',
  })
  @UseGuards(AuthGuard('jwt'))
  public async getAccountById(@Param('id') id: string): Promise<IAccount> {
    return await this.accountService.findAccount(id);
  }

  @Put(':accountId')
  @ApiOperation({
    summary: 'Update a given account',
    description:
      'Update a single account, currently only updates the name property and everything else remains the same',
  })
  @UseGuards(AuthGuard('jwt'))
  public async updateAccount(
    @Param('accountId') accountId: string,
    @Body() updateAccount: UpdateAccount
  ): Promise<IAccount> {
    if (accountId !== updateAccount.id) {
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
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  public async deleteAccountById(
    @Param('id') id: string
  ): Promise<{ message: string }> {
    return await this.accountService.deleteAccount(id);
  }
}
