import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BudgetModule } from './budget/budget.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { AccountModule } from './account/account.module';

@NgModule({
  declarations: [],
  imports: [BudgetModule, CommonModule, DashboardModule, FeaturesRoutingModule, AccountModule],
})
export class FeaturesModule {}
