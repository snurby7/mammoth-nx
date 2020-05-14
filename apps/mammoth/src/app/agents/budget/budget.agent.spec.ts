import { TestBed } from '@angular/core/testing';
import { HttpService } from '../../core';
import { BudgetAgent } from './budget.agent';

describe('BudgetAgent', () => {
  let budgetAgent: BudgetAgent;
  let httpService: HttpService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BudgetAgent,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    });
    budgetAgent = TestBed.inject(BudgetAgent);
    httpService = TestBed.inject(HttpService);
  });

  it('should be defined', () => {
    expect(budgetAgent).toBeTruthy();
  });

  it('should get all budgets', () => {
    budgetAgent.getBudgets();
    expect(httpService.get).toHaveBeenCalledWith('api/v1/budget');
  });

  it('should get all budgets', () => {
    budgetAgent.getBudgetDetail('123');
    expect(httpService.get).toHaveBeenCalledWith('api/v1/budget/:budgetId', {
      budgetId: '123',
    });
  });

  it('should delete a budget', () => {
    budgetAgent.deleteBudget('123');
    expect(httpService.delete).toHaveBeenCalledWith('api/v1/budget/:budgetId', {
      budgetId: '123',
    });
  });

  it('should create a new budget', () => {
    budgetAgent.createBudget({ name: 'test' });
    expect(httpService.post).toHaveBeenCalledWith('api/v1/budget', {
      name: 'test',
    });
  });

  it('should update a budget', () => {
    budgetAgent.updateBudget({ id: '123', name: 'test' });
    expect(httpService.post).toHaveBeenCalledWith(
      'api/v1/budget/:budgetId',
      { id: '123', name: 'test' },
      {
        budgetId: '123',
      }
    );
  });
});
