import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TransactionGridComponent } from './transaction-grid/transaction-grid.component';

@NgModule({
  declarations: [TransactionGridComponent],
  exports: [TransactionGridComponent],
  imports: [CommonModule],
})
export class TransactionsModule {}
