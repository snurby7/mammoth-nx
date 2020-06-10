import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../button/button.module';
import { BudgetTileComponent } from './tile/budget-tile.component';

@NgModule({
  declarations: [BudgetTileComponent],
  imports: [CommonModule, ButtonModule],
  exports: [BudgetTileComponent],
})
export class BudgetComponentModule {}
