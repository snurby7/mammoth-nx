import { ICreateCategory } from '@mammoth/api-interfaces';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategory implements ICreateCategory {
  @IsNotEmpty()
  @IsUUID()
  budgetId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Links to an optional parent category',
    required: false,
    example: '302e0ddc-7354-4f69-87ae-ba66d17622f2',
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
