import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BudgetModule } from './budget/budget.module';
import { CategoryModule } from './category/category.module';
import { Neo4jModule } from './neo4j/neo4j.module';
import { PayeeModule } from './payee/payee.module';
import { TransactionModule } from './transaction/transaction.module';

const routes: Routes = [
  {
    path: 'api/v1',
    children: [
      BudgetModule,
      CategoryModule,
      AccountModule,
      TransactionModule,
      PayeeModule,
    ],
  },
  {
    path: 'api/v2',
    children: [],
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    BudgetModule,
    CategoryModule,
    Neo4jModule,
    AccountModule,
    TransactionModule,
    PayeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
