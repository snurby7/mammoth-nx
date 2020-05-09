import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '../core';
import { BudgetAgent } from './budget';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpModule],
  providers: [BudgetAgent],
})
export class AgentsModule {}
