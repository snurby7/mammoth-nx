import { IPayeeCreate } from '@mammoth/api-interfaces';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePayee implements IPayeeCreate {
  @IsNotEmpty()
  @IsUUID()
  budgetId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
