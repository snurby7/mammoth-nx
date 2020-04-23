import { IAccount } from '@mammoth/api-interfaces';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { SupportedAccountType } from '../../constants';

export class UpdateAccount implements IAccount {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  budgetId: string;

  @IsNotEmpty()
  @IsEnum(SupportedAccountType, {
    message: 'Value must match a supported enum value',
  })
  type: SupportedAccountType;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  balance: number;
}
