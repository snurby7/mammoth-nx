import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ITransactionQuery } from '../../common';

/**
 * Transaction query object. Currently supported query objects.
 *  1. BudgetId
 *  2. Id
 *  3. AccountId
 *  4. PayeeId
 *  5. CategoryId
 *  6. Limit
 *
 * @export
 * @class TransactionQueryDto
 * @implements {ITransactionQuery}
 */
export class TransactionQueryDto implements ITransactionQuery {
  @ApiProperty({
    description: 'Id on the budget you want to search over',
    required: true,
    example: 'dc293001-41a5-4bd7-9484-6db520516587',
  })
  @IsUUID()
  budgetId: string;

  @ApiProperty({
    description: 'If you know the specific transaction id you can pass that here',
    required: false,
    example: '53b37aa8-2297-4dc8-a9c4-6f40fd5dbdd8',
  })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'If you know the specific account id you can pass that here',
    required: false,
    example: '1f083ddd-a891-4120-a52a-37a5c78b5f19',
  })
  @IsUUID()
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    description: 'If you know the specific payee id you can pass that here',
    required: false,
    example: '6706ed0d-ea5e-48d9-8bb1-efbb1ec4b547',
  })
  @IsUUID()
  @IsOptional()
  payeeId?: string;

  @ApiProperty({
    description: 'If you know the specific category id you can pass that here',
    required: false,
    example: '1dea30ec-4fe8-458e-a6b8-adb11a8b62af',
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    description: 'If you have a set number of transactions you want back it can go here',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  limit?: number;
}
