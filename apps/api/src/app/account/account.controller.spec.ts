import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jService } from '../neo4j';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

describe('Accounts Controller', () => {
  let controller: AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: Neo4jService,
          useValue: {},
        },
      ],
      controllers: [AccountController],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
