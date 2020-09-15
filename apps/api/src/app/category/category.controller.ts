import { ICategory, ICategorySearchResponse, IDeleteResponse } from '@mammoth/api-interfaces'
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
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Observable } from 'rxjs'
import { CategoryService } from './category.service'
import { CreateCategory, UpdateCategory } from './dto'

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post(':budgetId/create')
  @ApiOperation({ summary: 'Create Category or Child Category' })
  @ApiResponse({
    status: 201,
    description: 'The newly created category is returned',
  })
  @UseGuards(AuthGuard('jwt'))
  public createCategory(@Body() categoryRequest: CreateCategory): Observable<ICategory> {
    return this.categoryService.createCategory(categoryRequest)
  }

  @Get(':budgetId/list')
  @ApiOperation({
    summary: 'Get all categories',
    description: 'Get all the categories that have either Category or Child_Category as its label',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of all categories and their properties and labels.',
  })
  @UseGuards(AuthGuard('jwt'))
  public getAllCategoriesByBudgetId(
    @Param('budgetId') budgetId: string
  ): Observable<ICategorySearchResponse[]> {
    return this.categoryService.findCategories(budgetId)
  }

  @Get(':id/budget/:budgetId')
  @ApiOperation({
    summary: 'Get a single category',
    description: 'Get a category that has either Category or Child_Category as its label',
  })
  @ApiResponse({
    status: 200,
    description: 'A single category and its properties and labels',
  })
  @UseGuards(AuthGuard('jwt'))
  public getCategoryWithChildren(
    @Param('id') id: string,
    @Param('budgetId') budgetId: string
  ): Observable<ICategorySearchResponse[]> {
    return this.categoryService.getCategoryWithChildren(id, budgetId)
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
  @UseGuards(AuthGuard('jwt'))
  public async updateCategory(
    @Param('id') id: string,
    @Body() updateCategory: UpdateCategory
  ): Promise<ICategory> {
    if (id !== updateCategory.id) {
      throw new HttpException('The parameter id and the body id do not match.', HttpStatus.CONFLICT)
    }
    return await this.categoryService.updateCategory(updateCategory)
  }

  @Delete(':budgetId/delete/:id')
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
  @UseGuards(AuthGuard('jwt'))
  public delete(
    @Param('budgetId') budgetId: string,
    @Param('id') categoryId: string
  ): Observable<IDeleteResponse> {
    return this.categoryService.deleteCategory(categoryId, budgetId)
  }
}
