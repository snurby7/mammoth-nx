import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IPayee } from '../common';
import { CreatePayeeDto } from './dto/CreatePayeeDto';
import { PayeeQueryDto } from './dto/PayeeQueryDto';
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
  public async createPayee(@Body() createRequest: CreatePayeeDto): Promise<IPayee> {
    return await this.payeeService.createPayee(createRequest);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Payees by a given request' })
  @ApiResponse({
    status: 201,
    description: 'All payees that match the given request',
  })
  public async getAllPayees(@Body() request: PayeeQueryDto): Promise<IPayee[]> {
    return await this.payeeService.getAllPayees(request);
  }
}
