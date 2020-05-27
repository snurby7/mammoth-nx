import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountModule } from './account/account.module';
import { BudgetModule } from './budget/budget.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { TransactionsModule } from './transactions';

@NgModule({
  declarations: [],
  imports: [
    AccountModule,
    BudgetModule,
    CommonModule,
    DashboardModule,
    FeaturesRoutingModule,
    TransactionsModule,
  ],
})
export class FeaturesModule {}
