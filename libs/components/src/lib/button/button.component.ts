import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'delete' | 'warn';

@Component({
  selector: 'mammoth-button',
  template: `
    <button (click)="onClickHandler()" class="btn {{ variant }}">
      Button
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Output() onClick: EventEmitter<string> = new EventEmitter();
  @Input() value: string;
  @Input() id: string;
  @Input() variant?: ButtonType = 'primary';

  constructor() {}

  public onClickHandler() {
    this.onClick.next(this.id);
  }
}
