import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MammothBudgetComponentModule } from './budget-tile/budget-component.module';
import { MammothButtonModule } from './button/button.module';

@NgModule({
  imports: [CommonModule, MammothButtonModule, MammothBudgetComponentModule],
})
export class ComponentsModule {}
