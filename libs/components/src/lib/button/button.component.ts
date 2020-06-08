import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mammoth-button',
  templateUrl: 'button.component.html',
})
export class ButtonComponent implements OnInit {
  @Output() onClick: EventEmitter<string> = new EventEmitter();
  @Input() value: string;
  @Input() id: string;

  constructor() {}

  ngOnInit() {}
}
