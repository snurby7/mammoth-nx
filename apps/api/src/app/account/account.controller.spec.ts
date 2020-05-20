import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AccountModule } from './account.module';

describe('Accounts Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountModule],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({})
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    return request(app.getHttpServer()).get('/accounts/123').expect(200);
  });
});
