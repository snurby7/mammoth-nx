import { Test, TestingModule } from '@nestjs/testing'
import { BudgetService } from '../budget'
import { Neo4jService } from '../neo4j'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

describe('Category Controller', () => {
  let controller: CategoryController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        {
          provide: BudgetService,
          useValue: {},
        },
        {
          provide: Neo4jService,
          useValue: {},
        },
    ],
    }).compile()

    controller = module.get<CategoryController>(CategoryController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
