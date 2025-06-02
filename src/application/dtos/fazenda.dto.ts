import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class FazendaDto {
  @ApiProperty({
    example: 'Fazenda Bilu',
    description: 'Nome da fazenda',
    required: true,
  })
  @IsString({ message: 'Nome da fazenda deve ser uma string.' })
  @IsNotEmpty({ message: 'Nome da fazenda não pode estar vazio.' })
  name: string;

  @ApiProperty({
    example: 'São Paulo',
    description: 'Cidade da fazenda',
    required: true,
  })
  @IsString({ message: 'Cidade da fazenda deve ser uma string.' })
  @IsNotEmpty({ message: 'Cidade da fazenda não pode estar vazia.' })
  city: string;

  @ApiProperty({
    example: 'São Paulo',
    description: 'Estado da fazenda',
    required: true,
  })
  @IsString({ message: 'Estado da fazenda deve ser uma string.' })
  @IsNotEmpty({ message: 'Estado da fazenda não pode estar vazio.' })
  state: string;

  @ApiProperty({
    example: '10000',
    description: 'Área total da fazenda em hectares',
    required: true,
  })
  @IsNumber({}, { message: 'Área total deve ser um número inteiro' })
  @IsNotEmpty({ message: 'Área total não pode estar vazia.' })
  @Min(0)
  @Max(10000)
  totalArea: number;

  @ApiProperty({
    example: '1000',
    description: 'Área agrícola da fazenda',
    required: true,
  })
  @IsNumber({}, { message: 'Área agrícola deve ser um número inteiro' })
  @IsNotEmpty({ message: 'Área agrícola não pode estar vazia.' })
  agriculturalArea: number;

  @ApiProperty({
    example: '5000',
    description: 'Área de pastagem da fazenda',
    required: true,
  })
  @IsNumber({}, { message: 'Área de pastagem deve ser um número inteiro' })
  @IsNotEmpty({ message: 'Área de pastagem não pode estar vazia.' })
  vegetationArea: number;

  @ApiProperty({
    example: '123456789',
    description: 'ID do agricultor responsável pela fazenda',
    required: true,
  })
  @IsString({ message: 'ID do agricultor deve ser uma string.' })
  @IsNotEmpty({ message: 'ID do agricultor não pode estar vazio.' })
  farmerId: string;
}
