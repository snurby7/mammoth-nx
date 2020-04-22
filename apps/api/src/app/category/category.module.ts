import { Module } from '@nestjs/common'
import { BudgetModule } from '../budget'
import { CommonAccountModule } from '../extensions'
import { Neo4jModule } from '../neo4j'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
  imports: [Neo4jModule, CommonAccountModule, BudgetModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
