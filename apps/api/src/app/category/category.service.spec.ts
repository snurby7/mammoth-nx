import { Test, TestingModule } from '@nestjs/testing'
import { BudgetModule } from '../budget'
import { Neo4jService } from '../neo4j'
import { CategoryService } from './category.service'

describe('CategoryService', () => {
  let service: CategoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BudgetModule],
      providers: [
        CategoryService,
        {
          provide: Neo4jService,
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<CategoryService>(CategoryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
