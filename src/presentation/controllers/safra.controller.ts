import { SafraDto } from '@Application/dtos/safra.dto';
import { AtualizarSafraUseCase } from '@Application/use-cases/safra/atualiza-safra.use-case';
import { BuscarTodasSafrasUseCase } from '@Application/use-cases/safra/busca-safra.use-case';
import { CriarSafraUseCase } from '@Application/use-cases/safra/cria-safra.use-case';
import { RemoverSafraUseCase } from '@Application/use-cases/safra/deleta-safra.use-case';
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
import { Safra } from '../../domain/entities/safra.entity';

@ApiTags('Safras')
@Controller('safras')
export class SafraController {
  constructor(
    private readonly criarUseCase: CriarSafraUseCase,
    private readonly atualizarUseCase: AtualizarSafraUseCase,
    private readonly removerUseCase: RemoverSafraUseCase,
    private readonly buscarTodasUseCase: BuscarTodasSafrasUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma safra' })
  @ApiResponse({
    status: 200,
    description: 'Safra criada com sucesso.',
    type: SafraDto,
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async criar(@Body() dto: Safra): Promise<Safra> {
    return this.criarUseCase.execute(dto);
  }

  @Put()
  @ApiOperation({ summary: 'Atualizar uma safra' })
  @ApiResponse({
    status: 200,
    description: 'Safra atualizada com sucesso.',
    type: SafraDto,
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async atualizar(@Body() dto: Safra): Promise<Safra> {
    return this.atualizarUseCase.execute(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma safra' })
  @ApiResponse({
    status: 204,
    description: 'Safra removida com sucesso.',
    type: SafraDto,
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async remover(@Param('id') id: string): Promise<void> {
    return this.removerUseCase.execute(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as safras' })
  @ApiResponse({
    status: 200,
    description: 'Safras listadas com sucesso.',
    type: SafraDto,
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async buscarTodas(): Promise<Safra[]> {
    return this.buscarTodasUseCase.execute();
  }
}
