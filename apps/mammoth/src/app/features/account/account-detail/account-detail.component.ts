import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mammoth-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent {
  public accountId: string;
  constructor(private _activatedRoute: ActivatedRoute) {
    this.accountId = this._activatedRoute.snapshot.paramMap.get('accountId');
  }
}
