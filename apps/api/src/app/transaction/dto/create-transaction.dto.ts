import { ICreateTransaction } from '@mammoth/api-interfaces'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateIf,
} from 'class-validator'

export class TransactionCreateDto implements ICreateTransaction {
  @ApiProperty({
    description: 'The date of the transaction, this can be updated, must be an ISO String',
    example: '2020-01-25T14:16:18.362Z',
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  date: string

  @ApiProperty({
    description: 'Account id to link',
    example: '9c5126fb-e06e-47d0-81a1-684803be6713',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  accountId: string

  @ApiProperty({
    description: 'Payee id to link',
    example: 'aee9b132-1b96-43d1-813c-ed32277ae664',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  payeeId: string

  @ApiProperty({
    description: 'Category id to link',
    example: '870cf3c0-484e-4b8e-b4ce-52374c7bf0b8',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string

  @ApiProperty({
    description: 'Budget Id that has all the Id properties above',
    example: '6f76c705-aee2-404e-b2a8-a02cce1a0590',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  budgetId: string

  @ApiProperty({
    description: 'Total inflow from the transaction',
    example: 16.39,
  })
  @ValidateIf((prop) => !prop.outflow && prop.outflow !== 0)
  @IsNumber()
  @Min(0)
  inflow?: number

  @ApiProperty({
    description: 'Total outflow from the transaction',
    example: -16.39,
  })
  @ValidateIf((prop) => !prop.inflow && prop.inflow !== 0)
  @IsNumber()
  @Max(0)
  outflow?: number

  @ApiProperty({
    description: 'Just a little description on the transaction',
    example: 'Food sucked, never coming back',
    required: false,
  })
  @IsOptional()
  @IsString()
  memo?: string
}
