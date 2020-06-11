import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MammothButtonModule } from '@mammoth/components';
import { AuthModule } from '../auth';
import { NavBarComponent } from './nav-bar.component';

@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, AuthModule, MatButtonModule, MammothButtonModule],
  exports: [NavBarComponent],
})
export class NavBarModule {}
