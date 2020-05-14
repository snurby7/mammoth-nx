import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountListComponent } from './account-list/account-list.component';

@NgModule({
  declarations: [AccountListComponent],
  exports: [AccountListComponent],
  imports: [CommonModule],
})
export class AccountModule {}
