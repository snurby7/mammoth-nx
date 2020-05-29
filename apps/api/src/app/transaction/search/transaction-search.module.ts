import { Module } from '@nestjs/common';
import { Neo4jModule } from '../../neo4j';
import { TransactionSearchController } from './transaction-search.controller';
import { TransactionSearchService } from './transaction-search.service';

@Module({
  controllers: [TransactionSearchController],
  providers: [TransactionSearchService],
  imports: [Neo4jModule],
})
export class TransactionSearchModule {}
