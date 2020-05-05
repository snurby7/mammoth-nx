import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '../../../core/http';
import { BudgetAgent } from './agent/budget.agent';
import { BudgetComponent } from './budget.component';
import { BudgetService } from './budget.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BudgetComponent],
  imports: [CommonModule, HttpModule, RouterModule],
  exports: [BudgetComponent],
  providers: [BudgetAgent, BudgetService],
})
export class BudgetModule {}
