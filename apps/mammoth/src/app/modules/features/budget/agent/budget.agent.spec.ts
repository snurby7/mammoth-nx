import { TestBed } from '@angular/core/testing';
import { BudgetAgent } from './budget.agent';

describe('BudgetAgent', () => {
  let service: BudgetAgent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetAgent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
