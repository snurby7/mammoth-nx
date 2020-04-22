import { Module } from '@nestjs/common';
import { CommonAccountModule } from '../extensions';
import { Neo4jModule } from '../neo4j';
import { PayeeController } from './payee.controller';
import { PayeeService } from './payee.service';

@Module({
  controllers: [PayeeController],
  exports: [PayeeService],
  providers: [PayeeService],
  imports: [Neo4jModule, CommonAccountModule],
})
export class PayeeModule {}
