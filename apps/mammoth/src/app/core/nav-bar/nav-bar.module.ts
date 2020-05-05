import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '../auth';
import { NavBarComponent } from './nav-bar.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, AuthModule, MatButtonModule],
  exports: [NavBarComponent],
})
export class NavBarModule {}
