import { Test, TestingModule } from '@nestjs/testing'
import { Neo4jModule } from '../neo4j'
import { PayeeService } from './payee.service'

describe('PayeeService', () => {
  let service: PayeeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayeeService],
      imports: [Neo4jModule],
    }).compile()

    service = module.get<PayeeService>(PayeeService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
