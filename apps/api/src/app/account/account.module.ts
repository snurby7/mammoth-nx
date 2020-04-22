import { Module } from '@nestjs/common';
import { CommonAccountModule } from '../extensions';
import { Neo4jModule } from '../neo4j';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [Neo4jModule, CommonAccountModule],
  providers: [AccountService],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
