import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type ButtonType = 'primary' | 'accent' | 'warn';

@Component({
  selector: 'mammoth-button',
  template: `
    <button mat-raised-button color="{{ color }}" (click)="onClickHandler()">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Output() onClick: EventEmitter<string> = new EventEmitter();
  @Input() id: string;
  @Input() color?: ButtonType = 'primary';

  constructor() {}

  public ngOnInit() {
    console.log(this.color, this.id);
  }

  public onClickHandler() {
    this.onClick.next(this.id);
  }
}
