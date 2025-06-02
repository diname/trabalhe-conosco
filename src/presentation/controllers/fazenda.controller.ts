import { FazendaDto } from '@Application/dtos/fazenda.dto';
import { AtualizarFazendaUseCase } from '@Application/use-cases/fazenda/atualiza-fazenda.use-case';
import { BuscarTodasFazendasUseCase } from '@Application/use-cases/fazenda/busca-fazenda.use-case';
import { CriarFazendaUseCase } from '@Application/use-cases/fazenda/cria-fazenda.use-case';
import { RemoverFazendaUseCase } from '@Application/use-cases/fazenda/deleta-fazenda.use-case';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Fazenda } from '../../domain/entities/fazenda.entity';

@ApiTags('Fazendas')
@Controller('fazendas')
export class FazendaController {
  constructor(
    private readonly criarUseCase: CriarFazendaUseCase,
    private readonly atualizarUseCase: AtualizarFazendaUseCase,
    private readonly removerUseCase: RemoverFazendaUseCase,
    private readonly buscarTodasUseCase: BuscarTodasFazendasUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma fazenda' })
  @ApiResponse({
    status: 200,
    description: 'Fazenda criado com sucesso.',
    type: FazendaDto,
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async criar(@Body() dto: Fazenda): Promise<Fazenda> {
    return this.criarUseCase.execute(dto);
  }

  @Put()
  @ApiOperation({ summary: 'Atualizar uma fazenda' })
  @ApiResponse({
    status: 200,
    description: 'Fazenda atualizada com sucesso.',
    type: FazendaDto,
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async atualizar(@Body() dto: Fazenda): Promise<Fazenda> {
    return this.atualizarUseCase.execute(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma fazenda' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiResponse({
    status: 204,
    description: 'Fazenda removida com sucesso.',
    type: FazendaDto,
  })
  async remover(@Param('id') id: string): Promise<void> {
    return this.removerUseCase.execute(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as fazendas' })
  @ApiResponse({
    status: 200,
    description: 'Fazendas listadas com sucesso.',
    type: FazendaDto,
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async buscarTodas(): Promise<Fazenda[]> {
    return this.buscarTodasUseCase.execute();
  }
}
