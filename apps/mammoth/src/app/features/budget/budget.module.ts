import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MammothBudgetComponentModule, MammothButtonModule } from '@mammoth/components';
import { BudgetAgent } from '../../agents';
import { BudgetDialogModule } from './budget-dialog/budget-dialog.module';
import { BudgetComponent } from './budget.component';
import { BudgetService } from './budget.service';

@NgModule({
  declarations: [BudgetComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    RouterModule,
    BudgetDialogModule,
    MammothButtonModule,
    MammothBudgetComponentModule,
  ],
  exports: [BudgetComponent],
  providers: [BudgetAgent, BudgetService],
})
export class BudgetModule {}
