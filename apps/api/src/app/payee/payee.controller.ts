import { IPayee } from '@mammoth/api-interfaces'
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Observable } from 'rxjs'
import { CreatePayee } from './dto'
import { PayeeService } from './payee.service'

@Controller('payee')
@ApiTags('payee')
export class PayeeController {
  constructor(private payeeService: PayeeService) {}

  @Post(':budgetId')
  @ApiOperation({ summary: 'Create a payee' })
  @ApiResponse({
    status: 201,
    description: 'Returns the newly created payee',
  })
  @UseGuards(AuthGuard('jwt'))
  public createPayee(
    @Param('budgetId') budgetId: string,
    @Body() createRequest: CreatePayee
  ): Observable<IPayee> {
    if (!createRequest.budgetId || createRequest.budgetId !== budgetId) {
      throw new HttpException('No budgetId found on request', HttpStatus.CONFLICT)
    }
    return this.payeeService.createPayee(createRequest)
  }

  @Get(':budgetId')
  @ApiOperation({ summary: 'Get all Payees by a given request' })
  @ApiResponse({
    status: 201,
    description: 'All payees that match the given request',
  })
  @UseGuards(AuthGuard('jwt'))
  public getAllPayees(@Param('budgetId') budgetId: string): Observable<IPayee[]> {
    return this.payeeService.getAllPayees(budgetId)
  }
}
