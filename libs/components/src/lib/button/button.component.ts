import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonType = 'primary' | 'accent' | 'warn';

@Component({
  selector: 'mammoth-button',
  template: `
    <button
      mat-stroked-button
      [color]="variant"
      (click)="onClickHandler()"
      class="btn btn-{{ variant }}"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Output() onClick: EventEmitter<string> = new EventEmitter();
  @Input() id: string;
  @Input() variant?: ButtonType;

  constructor() {}

  public onClickHandler() {
    this.onClick.next(this.id);
  }
}
