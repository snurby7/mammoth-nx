import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthzModule } from './authz/authz.module';
import { BudgetModule } from './budget/budget.module';
import { CategoryModule } from './category/category.module';
import { Neo4jModule } from './neo4j/neo4j.module';
import { PayeeModule } from './payee/payee.module';
import { TransactionSearchModule } from './transaction';
import { TransactionModule } from './transaction/transaction.module';

const routes: Routes = [
  {
    path: 'v1',
    children: [
      BudgetModule,
      CategoryModule,
      AccountModule,
      TransactionModule,
      TransactionSearchModule,
      PayeeModule,
    ],
  },
  {
    path: 'v2',
    children: [],
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    AccountModule,
    AuthzModule,
    BudgetModule,
    CategoryModule,
    Neo4jModule,
    PayeeModule,
    TransactionModule,
    TransactionSearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
