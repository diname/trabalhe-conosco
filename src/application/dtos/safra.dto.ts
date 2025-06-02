import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SafraDto {
  @ApiProperty({
    description: 'Ano da safra',
    example: '2023',
    required: true,
  })
  @IsString({ message: 'O Ano da safra deve ser string' })
  @IsNotEmpty({ message: 'O Ano da safra não pode estar vazio' })
  year: string;

  @ApiProperty({
    description: 'ID da fazenda',
    example: '1',
    required: true,
  })
  @IsString({ message: 'O ID da fazenda deve ser string' })
  @IsNotEmpty({ message: 'O ID da fazenda não pode estar vazio' })
  farmId: string;

  @ApiProperty({
    description: 'IDs das culturas',
    example: ['cultura-123', 'cultura-456'],
    required: true,
  })
  @IsString({ message: 'Os IDs das culturas devem ser strings' })
  @IsNotEmpty({ message: 'Os IDs das culturas não podem estar vazios' })
  cropIds: string[];
}
