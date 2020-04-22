import { Module } from '@nestjs/common';
import { Neo4jModule } from '../../neo4j';
import { CommonAccountService } from './common-account.service';

/**
 * This module is for making things have a balance behind the scenes. There aren't currently usages of showing the balance.
 * Balance in this case is a running total of all transactions on a Category, Account, or Payee. So whenever a transaction
 * gets created it will increment or decrement the balance.
 *
 * @export
 * @class CommonAccountModule
 */
@Module({
  providers: [CommonAccountService],
  imports: [Neo4jModule],
  exports: [CommonAccountService],
})
export class CommonAccountModule {}
