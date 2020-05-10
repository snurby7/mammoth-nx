import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBudget, ICreateBudget } from '@mammoth/api-interfaces';

interface BudgetDialogComponentData {
  budget?: IBudget;
}

@Component({
  selector: 'mammoth-budget-dialog',
  templateUrl: './budget-dialog.component.html',
  styleUrls: ['./budget-dialog.component.css'],
})
export class BudgetDialogComponent {
  private readonly existingBudget: IBudget | null = null;
  public budgetTitle: string;

  constructor(
    public dialogRef: MatDialogRef<BudgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BudgetDialogComponentData
  ) {
    this.existingBudget = this.data.budget;
    if (this.existingBudget) {
      this.budgetTitle = this.existingBudget.name;
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public submitForm(): void {
    const newBudget: ICreateBudget = {
      ...(this.existingBudget ?? {}),
      name: this.budgetTitle,
    };
    this.dialogRef.close(newBudget);
  }
}
