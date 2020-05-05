import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBudget } from '@mammoth/api-interfaces';
import { Observable } from 'rxjs';
import { BudgetAgent } from './agent/budget.agent';

@Component({
  selector: 'mammoth-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {
  public budgets$: Observable<IBudget[]>;

  constructor(
    private budgetAgent: BudgetAgent,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.budgets$ = this.budgetAgent.getBudgets();
  }

  public onBudgetClick(budget: IBudget): void {
    this.router.navigate(['budget', budget.id], {
      relativeTo: this.activatedRoute,
    });
  }
}
