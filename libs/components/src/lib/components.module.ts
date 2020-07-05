import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MammothBudgetComponentModule } from './budget/budget-component.module';
import { MammothButtonModule } from './button/button.module';
import { GridModule } from './grid/grid.module';

@NgModule({
  imports: [CommonModule, MammothButtonModule, MammothBudgetComponentModule, GridModule],
})
export class ComponentsModule {}
