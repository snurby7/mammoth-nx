import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MammothButtonModule } from '../button/button.module';
import { BudgetTileComponent } from './tile/budget-tile.component';

@NgModule({
  imports: [CommonModule, MammothButtonModule],
  declarations: [BudgetTileComponent],
  exports: [BudgetTileComponent],
})
export class MammothBudgetComponentModule {}
