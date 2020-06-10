import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonType = 'outline' | 'primary' | 'delete';

@Component({
  selector: 'mammoth-button',
  template: `
    <button (click)="onClickHandler()" class="btn btn-{{ variant }}">
      {{ value }}
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Output() onClick: EventEmitter<string> = new EventEmitter();
  @Input() value: string;
  @Input() id: string;
  @Input() variant?: ButtonType = 'outline';

  constructor() {}

  public onClickHandler() {
    this.onClick.next(this.id);
  }
}
