import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IBudgetRequest } from '../../common';

export class BudgetDto implements IBudgetRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name property given to your budget',
    example: 'Colorado Getaway',
    required: true,
  })
  name: string;
}
