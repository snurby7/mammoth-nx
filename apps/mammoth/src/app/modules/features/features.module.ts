import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BudgetModule } from './budget/budget.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FeaturesRoutingModule } from './features-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FeaturesRoutingModule, BudgetModule, DashboardModule],
})
export class FeaturesModule {}
