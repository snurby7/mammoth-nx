import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [AccountListComponent],
  exports: [AccountListComponent],
  imports: [AccountRoutingModule, CommonModule, MatButtonModule, RouterModule],
})
export class AccountModule {}
