import { IUpdateBudget } from '@mammoth/api-interfaces';
import { IsNotEmpty, IsString } from 'class-validator';
import { Budget } from './budget.dto';

export class UpdateBudget extends Budget implements IUpdateBudget {
  @IsNotEmpty()
  @IsString()
  id: string;
}
