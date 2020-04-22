import { Module } from '@nestjs/common';
import { AccountModule } from '../account';
import { CategoryModule } from '../category';
import { Neo4jModule } from '../neo4j';
import { PayeeModule } from '../payee';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
/**
 * The transaction module brings in the Payee, Category and Account module to allow it to handle the cases of
 * needing to update a payee/category/acccount in a reusable way, it's a way to separate away the concerns
 *
 * @export
 * @class TransactionModule
 */
@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [Neo4jModule, PayeeModule, CategoryModule, AccountModule],
})
export class TransactionModule {}
