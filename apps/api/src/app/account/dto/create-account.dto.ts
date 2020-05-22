import { ICreateAccount, SupportedAccountType } from '@mammoth/api-interfaces';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID
} from 'class-validator';

export class CreateAccount implements ICreateAccount {
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
