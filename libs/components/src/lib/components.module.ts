import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MammothBudgetComponentModule } from './budget-tile/budget-component.module';
import { MammothButtonModule } from './button/button.module';
import { DialogComponent } from './dialog/dialog.component';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
  imports: [CommonModule, MammothButtonModule, MammothBudgetComponentModule, DialogModule],
  declarations: [DialogComponent],
})
export class ComponentsModule {}
