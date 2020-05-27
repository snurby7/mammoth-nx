import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TransactionsModule } from '../transactions';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [AccountListComponent, AccountDetailComponent],
  exports: [AccountListComponent, AccountDetailComponent],
  imports: [
    AccountRoutingModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
    TransactionsModule,
  ],
})
export class AccountModule {}
