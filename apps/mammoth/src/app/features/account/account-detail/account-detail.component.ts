import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mammoth-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public onClickGetTransaction(): void {
    // going to fire a query for testing. In order to nicely display the transactions in a grid. It needs to be
    // a FormattedValue of sorts.
  }
}
