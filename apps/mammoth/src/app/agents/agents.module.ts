import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '../core';
import { AccountAgent } from './account/account.agent';
import { BudgetAgent } from './budget';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpModule],
  providers: [BudgetAgent, AccountAgent],
})
export class AgentsModule {}
