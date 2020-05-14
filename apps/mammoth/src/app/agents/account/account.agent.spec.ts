import { TestBed } from '@angular/core/testing';
import { SupportedAccountType } from '@mammoth/api-interfaces';
import { HttpService } from '../../core';
import { AccountAgent } from './account.agent';

describe('AccountAgent', () => {
  let accountAgent: AccountAgent;
  let httpService: HttpService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountAgent,
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
    accountAgent = TestBed.inject(AccountAgent);
    httpService = TestBed.inject(HttpService);
  });

  it('should be defined', () => {
    expect(accountAgent).toBeTruthy();
  });

  it('should getAccounts for budget', () => {
    accountAgent.getAccounts('test');
    expect(httpService.get).toHaveBeenCalledWith('api/v1/accounts/:budgetId', {
      budgetId: 'test',
    });
  });

  it('should delete a account', () => {
    accountAgent.deleteAccount('test-budget-id', '123');
    expect(httpService.delete).toHaveBeenCalledWith(
      'api/v1/accounts/:budgetId/account/:accountId',
      {
        budgetId: 'test-budget-id',
        accountId: '123',
      }
    );
  });

  it('should create a new account', () => {
    accountAgent.createAccount('test', {
      name: 'test',
      type: SupportedAccountType.Cash,
      balance: 900,
      budgetId: 'test',
    });
    expect(httpService.post).toHaveBeenCalledWith(
      'api/v1/accounts/:budgetId',
      {
        name: 'test',
        type: SupportedAccountType.Cash,
        balance: 900,
        budgetId: 'test',
      },
      {
        budgetId: 'test',
      }
    );
  });

  // it('should update a account', () => {
  //   accountAgent.updateAccount({ id: '123', name: 'test' });
  //   expect(httpService.post).toHaveBeenCalledWith(
  //     'api/v1/account/:accountId',
  //     { id: '123', name: 'test' },
  //     {
  //       accountId: '123',
  //     }
  //   );
  // });
});
