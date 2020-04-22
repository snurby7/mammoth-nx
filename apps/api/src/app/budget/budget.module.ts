import { Module } from '@nestjs/common'
import { Neo4jModule } from '../neo4j'
import { BudgetController } from './budget.controller'
import { BudgetService } from './budget.service'

@Module({
  imports: [Neo4jModule],
  controllers: [BudgetController],
  exports: [BudgetService],
  providers: [BudgetService],
})
export class BudgetModule {}
