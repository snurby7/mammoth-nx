import { IBudget, IDeleteResponse } from '@mammoth/api-interfaces';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { BudgetModule } from './budget.module';
import { Budget } from './dto';

describe('Budget Controller', () => {
  let app: INestApplication;
  let budgetResponse: IBudget;

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

  afterEach(async () => {
    await request(app.getHttpServer())
      .delete(`/budget/${budgetResponse.id}`)
      .send()
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const deleteResponse: IDeleteResponse = response.body;
        expect(deleteResponse.id).toBe(budgetResponse.id);
        expect(deleteResponse.isDeleted).toBeTruthy();
        expect(deleteResponse.message).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new budget and return it back', async () => {
    await request(app.getHttpServer())
      .post('/budget')
      .send({
        name: 'Test Budget',
      } as Budget)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        budgetResponse = response.body;
        expect(budgetResponse.id).toBeDefined();
        expect(budgetResponse.name).toBe('Test Budget');
        expect(budgetResponse.createdDate).toBeDefined();
      });
  });
});
 nx run-many --target=serve --projects=api,mammoth