import { ITransaction } from '@mammoth/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { TransactionCreateDto } from './create-transaction.dto';

export class TransactionDto extends TransactionCreateDto
  implements ITransaction {
  @ApiProperty({
    description:
      'Must have an id on this in order to find the correct transaction to update',
    example: '2ba85dda-7a9f-4046-9841-89bc15b9295f',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
