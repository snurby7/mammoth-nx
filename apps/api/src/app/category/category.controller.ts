import { ICategory, ICategorySearchResponse } from '@mammoth/api-interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryQuery, CreateCategory, UpdateCategory } from './dto';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create Category or Child Category' })
  @ApiResponse({
    status: 201,
    description: 'The newly created category is returned',
  })
  public async create(
    @Body() categoryRequest: CreateCategory
  ): Promise<ICategory> {
    return await this.categoryService.createCategory(categoryRequest);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all categories',
    description:
      'Get all the categories that have either Category or Child_Category as its label',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of all categories and their properties and labels.',
  })
  public async findAll(
    @Body() query?: CategoryQuery
  ): Promise<ICategorySearchResponse[]> {
    return await this.categoryService.findCategories(query);
  }

  @Get(':id/budget/:budgetId')
  @ApiOperation({
    summary: 'Find a single category',
    description:
      'Get a category that has either Category or Child_Category as its label',
  })
  @ApiResponse({
    status: 200,
    description: 'A single category and its properties and labels',
  })
  public async findOne(
    @Param('id') id: string,
    @Param('budgetId') budgetId: string
  ): Promise<ICategorySearchResponse[]> {
    return await this.categoryService.findCategory(id, budgetId);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a category',
    description: `
      Update properties on a category. First thing it checks is if a parentCategoryId is set
      if a parentCategoryId is set it will update its link to the category. If a budgetId is set it will remove
      the parentCategoryId and relink to the budget.
    `,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns back the updated category with its properties and labels after being updated',
  })
  public async update(
    @Param('id') id: string,
    @Body() updateCategory: UpdateCategory
  ): Promise<ICategory> {
    if (id !== updateCategory.id) {
      throw new HttpException(
        'The parameter id and the body id do not match.',
        HttpStatus.CONFLICT
      );
    }
    return await this.categoryService.updateCategory(updateCategory);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a category',
    description: `
      This will delete a full category and all of its children.
    `,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns back a message saying how many nodes have been deleted. Data will need to refresh itself after making this request.',
  })
  public async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.categoryService.deleteCategory(id);
  }
}
