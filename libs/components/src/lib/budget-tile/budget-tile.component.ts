import { Component, Input, OnInit } from '@angular/core';
import { IBudget } from '@mammoth/api-interfaces';

@Component({
  selector: 'mammoth-budget-tile',
  templateUrl: './budget-tile.component.html',
  styleUrls: ['./budget-tile.component.scss'],
})
export class BudgetTileComponent implements OnInit {
  @Input() budgetDetail: IBudget;

  constructor() {}

  ngOnInit(): void {}
}
