import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ITransactionDeleteRequest } from '../../common';

export class TransactionDeleteDto implements ITransactionDeleteRequest {
  @ApiProperty({
    description: 'Budget Id to remove transaction from',
    example: 'ab4455a2-f18a-4554-a012-cc4bb40ec384',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  budgetId: string;

  @ApiProperty({
    description: 'Transaction Id to remove',
    example: 'caaf736f-b3f1-4d5d-aa21-1999f18a24cd',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
