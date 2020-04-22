import { Test, TestingModule } from '@nestjs/testing'
import { Neo4jModule } from '../../neo4j'
import { CommonAccountService } from './common-account.service'

describe('CommonAccountService', () => {
  let service: CommonAccountService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonAccountService],
      imports: [Neo4jModule],
    }).compile()

    service = module.get<CommonAccountService>(CommonAccountService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
