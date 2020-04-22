import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ICategoryUpdate } from '../../common';

export class UpdateCategoryDto implements ICategoryUpdate {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  budgetId: string;

  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Parent category Id to link to',
    example: '582ba03f-7c68-4ac6-a097-72e02b0385c6',
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
