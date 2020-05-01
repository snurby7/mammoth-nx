import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [LandingRoutingModule, CommonModule],
})
export class LandingModule {}
