import { IDateRangeSearchQuery } from '@mammoth/api-interfaces'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, Max, Min } from 'class-validator'

export class TransactionDateQueryDto implements IDateRangeSearchQuery {
  @ApiProperty({
    description: 'The day to start from',
    required: true,
    example: 1,
  })
  @IsNumber()
  @Min(1)
  dayStart: number

  @ApiProperty({
    description: 'The day of the month to end on',
    required: true,
    example: '17',
  })
  @IsNumber()
  @Min(1)
  dayEnd: number

  @ApiProperty({
    description: 'The lower bound month',
    required: true,
    example: 9,
  })
  @IsNumber()
  @Min(1)
  @Max(12)
  monthStart: number

  @ApiProperty({
    description: 'The upper bound month',
    required: true,
    example: '',
  })
  @IsNumber()
  @Min(1)
  @Max(12)
  monthEnd: number

  @ApiProperty({
    description: 'The upper bound year',
    required: true,
    example: '',
  })
  @IsNumber()
  yearEnd: number

  @ApiProperty({
    description: 'The lower bound year',
    required: true,
    example: '',
  })
  @IsNumber()
  yearStart: number
}
