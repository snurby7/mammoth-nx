import { Test, TestingModule } from '@nestjs/testing'
import { AccountModule } from '../account'
import { CategoryModule } from '../category'
import { Neo4jModule } from '../neo4j'
import { PayeeModule } from '../payee'
import { TransactionController } from './transaction.controller'
import { TransactionService } from './transaction.service'

describe('Transaction Controller', () => {
  let controller: TransactionController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [TransactionService],
      imports: [Neo4jModule, AccountModule, CategoryModule, PayeeModule],
    }).compile()

    controller = module.get<TransactionController>(TransactionController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
