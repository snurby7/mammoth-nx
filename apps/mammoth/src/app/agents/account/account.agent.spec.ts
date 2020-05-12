import { TestBed } from '@angular/core/testing';
import { SupportedAccountType } from '@mammoth/api-interfaces';
import { HttpService } from '../../core';
import { AccountAgent } from './account.agent';

fdescribe('AccountAgent', () => {
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

  it('should get all accounts', () => {
    accountAgent.getAccounts();
    expect(httpService.get).toHaveBeenCalledWith('api/v1/account');
  });

  it('should delete a account', () => {
    accountAgent.deleteAccount('123');
    expect(httpService.delete).toHaveBeenCalledWith(
      'api/v1/account/:accountId',
      {
        accountId: '123',
      }
    );
  });

  it('should create a new account', () => {
    accountAgent.createAccount({
      name: 'test',
      type: SupportedAccountType.Checking,
      balance: 100,
      budgetId: 'test-budget-id'
    });
    expect(httpService.post).toHaveBeenCalledWith('api/v1/account', {
      name: 'test',
      type: SupportedAccountType.Checking,
      balance: 100,
      budgetId: 'test-budget-id'
    });
  });
});
