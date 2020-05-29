import { Test, TestingModule } from '@nestjs/testing'
import { AccountModule } from '../../account'
import { BudgetModule } from '../../budget'
import { CategoryModule } from '../../category'
import { Neo4jModule } from '../../neo4j'
import { PayeeModule } from '../../payee'
import { TransactionService } from '../transaction.service'

describe('TransactionService', () => {
  let service: TransactionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionService],
      imports: [AccountModule, BudgetModule, Neo4jModule, CategoryModule, PayeeModule],
    }).compile()

    service = module.get<TransactionService>(TransactionService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
