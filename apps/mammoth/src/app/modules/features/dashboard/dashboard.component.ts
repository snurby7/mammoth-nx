import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mammoth-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
    console.log(this.route.snapshot.params['budgetId']);
  }

  ngOnInit(): void {}
}
