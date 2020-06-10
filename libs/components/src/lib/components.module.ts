import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BudgetComponentModule } from './budget-tile/budget-component.module';
import { ButtonModule } from './button/button.module';

@NgModule({
  imports: [CommonModule, ButtonModule, BudgetComponentModule],
})
export class ComponentsModule {}
