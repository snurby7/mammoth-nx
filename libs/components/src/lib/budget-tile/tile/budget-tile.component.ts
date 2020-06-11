import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBudget } from '@mammoth/api-interfaces';

@Component({
  selector: 'mammoth-budget-tile',
  templateUrl: './budget-tile.component.html',
  styleUrls: ['./budget-tile.component.scss'],
})
export class BudgetTileComponent {
  @Input() budgetDetail: IBudget;
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  @Output() onSelect: EventEmitter<string> = new EventEmitter();
  @Output() onEdit: EventEmitter<IBudget> = new EventEmitter();

  constructor() {}

  public onSelectClick(): void {
    this.onSelect.next(this.budgetDetail.id);
  }

  public onDeleteClick(): void {
    this.onDelete.next(this.budgetDetail.id);
  }

  public onEditClick(): void {
    this.onEdit.next(this.budgetDetail);
  }
}
