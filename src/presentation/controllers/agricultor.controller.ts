import { AgricultorDto } from '@Application/dtos/agricultor.dto';
import { AtualizarAgricultorUseCase } from '@Application/use-cases/agricultor/atualiza-agricultor.use-case';
import { BuscarTodosAgricultoresUseCase } from '@Application/use-cases/agricultor/busca-agricultor.use-case';
import { CriarAgricultorUseCase } from '@Application/use-cases/agricultor/cria-agricultor.use-case';
import { RemoverAgricultorUseCase } from '@Application/use-cases/agricultor/deleta-agricultor.use-case';
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
import { Agricultor } from '../../domain/entities/agricultor.entity';
@ApiTags('Agricultores')
@Controller('agricultores')
export class AgricultorController {
  constructor(
    private readonly criarUseCase: CriarAgricultorUseCase,
    private readonly atualizarUseCase: AtualizarAgricultorUseCase,
    private readonly removerUseCase: RemoverAgricultorUseCase,
    private readonly buscarTodosUseCase: BuscarTodosAgricultoresUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um agricultor' })
  @ApiResponse({
    status: 201,
    description: 'Agricultor criado com sucesso.',
    type: AgricultorDto,
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async criar(@Body() dto: Agricultor): Promise<Agricultor> {
    return this.criarUseCase.execute(dto);
  }

  @Put()
  @ApiOperation({ summary: 'Atualizar um agricultor' })
  @ApiResponse({
    status: 200,
    description: 'Agricultor atualizado com sucesso.',
    type: AgricultorDto,
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async atualizar(@Body() dto: Agricultor): Promise<Agricultor> {
    return this.atualizarUseCase.execute(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um agricultor' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({
    status: 204,
    description: 'Deleta um agricultor',
    type: AgricultorDto,
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async remover(@Param('id') id: string): Promise<void> {
    return this.removerUseCase.execute(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os agricultores' })
  @ApiResponse({
    status: 200,
    description: 'Lista retornada com sucesso.',
    type: AgricultorDto,
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async buscarTodos(): Promise<Agricultor[]> {
    return this.buscarTodosUseCase.execute();
  }
}
