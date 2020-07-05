import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MammothDialogComponent } from './dialog.component';

@NgModule({
  declarations: [],
  exports: [MammothDialogComponent],
  imports: [CommonModule, MatDialogModule],
})
export class MammothDialogModule {}
