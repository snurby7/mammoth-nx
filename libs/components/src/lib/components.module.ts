import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BudgetTileComponent } from './budget-tile/budget-tile.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BudgetTileComponent, ButtonComponent],
})
export class ComponentsModule {}
