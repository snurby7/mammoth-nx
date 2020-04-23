import { IAccountQuery } from '@mammoth/api-interfaces';
import { IsOptional, IsUUID } from 'class-validator';
export class AccountQuery implements IAccountQuery {
  @IsUUID()
  budgetId: string;

  @IsOptional()
  limit?: number;
}
