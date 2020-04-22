import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IPayeeCreate } from '../../common';

export class CreatePayeeDto implements IPayeeCreate {
  @IsNotEmpty()
  @IsUUID()
  budgetId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
