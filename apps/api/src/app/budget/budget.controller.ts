import { IBudget, IDeleteResponse } from '@mammoth/api-interfaces'
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Observable } from 'rxjs'
import { BudgetService } from './budget.service'
import { Budget, BudgetQuery, UpdateBudget } from './dto'

@Controller('budget')
@ApiTags('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  @ApiOperation({
    summary: 'Create Budget',
    description: `
      Creates a budget, a budget is the top level node for the system. A budget can be thought of as an Excel document.
      You can have multiple sheets in one Excel document, so think of sheets as categories, transactions, accounts, etc.
    `,
  })
  @ApiResponse({
    status: 201,
    description: 'The newly created budget is returned',
  })
  @UseGuards(AuthGuard('jwt'))
  public createNewBudget(@Body() budgetRequest: Budget): Observable<IBudget> {
    return this.budgetService.createBudget(budgetRequest)
  }

  @Get()
  @ApiOperation({
    summary: 'Get all budgets',
    description: 'Get all the budgets that have Budget as its label',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of all budgets and their properties and labels.',
  })
  @UseGuards(AuthGuard('jwt'))
  public queryBudgets(@Body() query: BudgetQuery): Observable<IBudget[]> {
    return this.budgetService.queryBudgets(query)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a single budget',
    description: 'Get a budget that has Budget as its label',
  })
  @ApiResponse({
    status: 200,
    description: 'A single budget and its properties and labels',
  })
  @UseGuards(AuthGuard('jwt'))
  public getBudget(@Param('id') id: string): Observable<IBudget> {
    return this.budgetService.getBudget(id)
  }

  @Post(':id')
  @ApiOperation({
    description:
      'Update a single budget, currently only updates the name property and everything else remains the same',
  })
  @UseGuards(AuthGuard('jwt'))
  public updateExistingBudget(
    @Param('id') budgetId: string,
    @Body() request: UpdateBudget
  ): Observable<IBudget> {
    if (budgetId !== request.id) {
      throw new BadRequestException()
    }
    return this.budgetService.saveBudget(request)
  }

  @ApiOperation({
    summary: 'Delete a budget',
    description: `
      This will delete a budget and all of its children. Think of it as deleting an Excel document but no backups.
    `,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns back a message saying how many nodes have been deleted. Data will need to refresh itself after making this request.',
  })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  public removeBudgetById(@Param('id') id: string): Observable<IDeleteResponse> {
    return this.budgetService.deleteBudget(id)
  }
}
