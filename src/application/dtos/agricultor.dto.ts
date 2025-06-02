import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class AgricultorDto {
  @ApiProperty({
    description: 'Documento do agricultor (CPF ou CNPJ)',
    example: '12345678901',
    required: true,
  })
  @IsString({ message: 'Documento deve ser uma string.' })
  @IsNotEmpty({ message: 'Documento não pode estar vazio.' })
  @Matches(/^\d{11}$|^\d{14}$/, {
    message: 'Documento deve ser CPF (11 dígitos) ou CNPJ (14 dígitos)',
  })
  document: string;

  @ApiProperty({
    description: 'Nome do agricultor',
    example: 'João da Silva',
    required: true,
  })
  @IsString({ message: 'Nome deve ser uma string.' })
  @IsNotEmpty({ message: 'Nome não pode estar vazio.' })
  name: string;
}
