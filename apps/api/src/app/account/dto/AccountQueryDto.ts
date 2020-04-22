import { IsOptional, IsUUID } from 'class-validator';
import { IAccountQuery } from '../../common';

export class AccountQueryDto implements IAccountQuery {
  @IsUUID()
  budgetId: string;

  @IsOptional()
  limit?: number;
}
