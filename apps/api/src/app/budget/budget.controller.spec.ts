import { IBudget } from '@mammoth/api-interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { Neo4jService } from '../neo4j';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { Budget } from './dto';

describe('Budget Controller', () => {
  let controller: BudgetController;
  let budgetService: BudgetService;

  const defaultBudget: IBudget = {
    id: '123',
    name: 'test',
    startDate: 'testStartDate',
    createdDate: 'testCreatedDate',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetController],
      providers: [
        BudgetService,
        {
          provide: Neo4jService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BudgetController>(BudgetController);
    budgetService = module.get<BudgetService>(BudgetService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(budgetService).toBeDefined();
  });

  it('createBudget - should get the correct response from the budgetService', () => {
    const request: Budget = {
      name: 'test',
    };

    jest
      .spyOn(budgetService, 'createBudget')
      .mockImplementation((budget: Budget) =>
        of({
          ...defaultBudget,
          ...budget,
        })
      );

    controller.createNewBudget(request).subscribe({
      next: (result) => {
        expect(result.id).toBeDefined();
        expect(result.name).toBe(request.name);
      },
    });
  });

  it('should hit the queryBudgets method', () => {
    const spy = jest.fn();
    jest.spyOn(budgetService, 'queryBudgets').mockImplementation(() => spy());
    controller.queryBudgets();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should hit the getBudget method', () => {
    const spy = jest.fn();
    jest.spyOn(budgetService, 'getBudget').mockImplementation(() => spy());
    controller.getBudget('test');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should hit the updateExistingBudget method with same ids', () => {
    const spy = jest.fn();
    jest
      .spyOn(budgetService, 'saveBudget')
      .mockImplementation((request) => spy(request));
    controller.updateExistingBudget('test123', { id: 'test123', name: '' });
    expect(spy).toHaveBeenCalledWith({ id: 'test123', name: '' });
  });

  it('should throw from updateExistingBudget method with different ids', () => {
    const spy = jest.fn();
    jest
      .spyOn(budgetService, 'saveBudget')
      .mockImplementation((request) => spy(request));
    expect(() =>
      controller.updateExistingBudget('test1235', { id: 'test123', name: '' })
    ).toThrow();
  });

  it('should hit the deleteBudget method with the id', () => {
    const spy = jest.fn();
    jest
      .spyOn(budgetService, 'deleteBudget')
      .mockImplementation((id) => spy(id));
    controller.removeBudgetById('test123');
    expect(spy).toHaveBeenCalledWith('test123');
  });
});
