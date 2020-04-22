import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { IAccountCreate, SupportedAccountType } from '../../common';

export class CreateAccountDto implements IAccountCreate {
  @IsUUID()
  budgetId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(SupportedAccountType, {
    message: 'Value must match a supported enum value',
  })
  type: SupportedAccountType;

  @IsNumber()
  @IsNotEmpty()
  balance: number;
}
