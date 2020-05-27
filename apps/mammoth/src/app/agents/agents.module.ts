import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '../core';
import { AccountAgent } from './account/account.agent';
import { BudgetAgent } from './budget/budget.agent';
import { TransactionAgent } from './transaction/transaction.agent';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpModule],
  providers: [AccountAgent, BudgetAgent, TransactionAgent],
})
export class AgentsModule {}
