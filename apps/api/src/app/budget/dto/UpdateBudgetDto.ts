import { IsNotEmpty, IsString } from 'class-validator';
import { IBudgetUpdate } from '../../common';
import { BudgetDto } from './BudgetDto';

export class UpdateBudgetDto extends BudgetDto implements IBudgetUpdate {
  @IsNotEmpty()
  @IsString()
  id: string;
}
