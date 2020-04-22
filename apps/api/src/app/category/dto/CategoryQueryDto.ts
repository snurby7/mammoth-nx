import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ICategoryQuery } from '../../common';

export class CategoryQueryDto implements ICategoryQuery {
  @IsNotEmpty()
  @IsUUID()
  budgetId: string;

  @IsOptional()
  limit?: number;
}
