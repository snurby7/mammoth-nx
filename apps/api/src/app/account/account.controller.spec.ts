import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { getNeo4jDriver } from '../neo4j/neo4j.module';
import { AccountModule } from './account.module';

describe('Accounts Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountModule],
      providers: [
        {
          provide: 'Neo4j',
          useFactory: () => getNeo4jDriver(true),
        },
      ],
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

  it('should create a new', () => {
    // return request(app.getHttpServer()).get('/accounts/123').expect(200);
  });
});
