import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mammoth-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class MammothDialogComponent {
  public isModalActive = false;
  @Input() buttonText: string;

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor() {}

  public toggleModal(): void {
    this.isModalActive = !this.isModalActive;
  }
}
