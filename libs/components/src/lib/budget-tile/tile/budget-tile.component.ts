import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBudget } from '@mammoth/api-interfaces';

@Component({
  selector: 'mammoth-budget-tile',
  templateUrl: './budget-tile.component.html',
  styleUrls: ['./budget-tile.component.scss'],
})
export class BudgetTileComponent {
  @Input() budgetDetail: IBudget;
  @Output() onBudgetDelete: EventEmitter<string> = new EventEmitter();
  @Output() onBudgetSelect: EventEmitter<string> = new EventEmitter();
  @Output() onBudgetEdit: EventEmitter<IBudget> = new EventEmitter();

  constructor() {}

  public onSelect(): void {
    this.onBudgetSelect.next(this.budgetDetail.id);
  }

  public onDelete(): void {
    this.onBudgetDelete.next(this.budgetDetail.id);
  }

  public onEdit(): void {
    this.onBudgetEdit.next(this.budgetDetail);
  }
}
