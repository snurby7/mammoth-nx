import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mammoth-transaction-grid',
  templateUrl: './transaction-grid.component.html',
  styleUrls: ['./transaction-grid.component.scss'],
})
export class TransactionGridComponent implements OnInit {
  @Input() accountId: string;
  constructor() {}

  ngOnInit(): void {
    console.log(this.accountId);
  }
}
