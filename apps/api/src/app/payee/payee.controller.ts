import { IPayee } from '@mammoth/api-interfaces';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePayee, PayeeQuery } from './dto';
import { PayeeService } from './payee.service';

@Controller('payee')
@ApiTags('payee')
export class PayeeController {
  constructor(private payeeService: PayeeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a payee' })
  @ApiResponse({
    status: 201,
    description: 'Returns the newly created payee',
  })
  public async createPayee(
    @Body() createRequest: CreatePayee
  ): Promise<IPayee> {
    return await this.payeeService.createPayee(createRequest);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Payees by a given request' })
  @ApiResponse({
    status: 201,
    description: 'All payees that match the given request',
  })
  public async getAllPayees(@Body() request: PayeeQuery): Promise<IPayee[]> {
    return await this.payeeService.getAllPayees(request);
  }
}
