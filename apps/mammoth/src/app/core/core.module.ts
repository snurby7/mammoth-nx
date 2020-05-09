import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth';
import { HttpModule } from './http';
import { NavBarModule } from './nav-bar';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthModule, HttpModule, NavBarModule],
})
export class CoreModule {}
