import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BudgetAgent } from '../../agents';
import { HttpModule } from '../../core';
import { BudgetDialogModule } from './budget-dialog/budget-dialog.module';
import { BudgetComponent } from './budget.component';
import { BudgetService } from './budget.service';

@NgModule({
  declarations: [BudgetComponent],
  imports: [
    CommonModule,
    HttpModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    RouterModule,
    BudgetDialogModule,
  ],
  exports: [BudgetComponent],
  providers: [BudgetAgent, BudgetService],
})
export class BudgetModule {}
