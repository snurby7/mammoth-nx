import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { BudgetModule } from './budget.module';
import { Budget } from './dto';

describe('Accounts Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BudgetModule],
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

  it('should create a new budget and return it back', () => {
    return request(app.getHttpServer())
      .post('/budget')
      .send({
        name: 'Test Budget',
      } as Budget)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.name).toBe('Test Budget');
      });
  });
});
