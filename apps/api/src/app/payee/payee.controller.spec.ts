import { Test, TestingModule } from '@nestjs/testing'
import { Neo4jService } from '../neo4j'
import { PayeeController } from './payee.controller'
import { PayeeService } from './payee.service'

describe('Payee Controller', () => {
  let controller: PayeeController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayeeController],
      providers: [
        PayeeService,
        {
          provide: Neo4jService,
          useValue: {},
        },
      ],
    }).compile()

    controller = module.get<PayeeController>(PayeeController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
