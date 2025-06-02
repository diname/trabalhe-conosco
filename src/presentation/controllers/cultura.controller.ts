import { CulturaDto } from '@Application/dtos/cultura.dto';
import { AtualizarCulturaUseCase } from '@Application/use-cases/cultura/atualiza-cultura.use-case';
import { BuscarTodasCulturasUseCase } from '@Application/use-cases/cultura/busca-cultura.use-case';
import { CriarCulturaUseCase } from '@Application/use-cases/cultura/cria-cultura.use-case';
import { RemoverCulturaUseCase } from '@Application/use-cases/cultura/deleta-cultura.use-case';
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
import { Cultura } from '../../domain/entities/cultura.entity';

@ApiTags('Culturas')
@Controller('culturas')
export class CulturaController {
  constructor(
    private readonly criarUseCase: CriarCulturaUseCase,
    private readonly atualizarUseCase: AtualizarCulturaUseCase,
    private readonly removerUseCase: RemoverCulturaUseCase,
    private readonly buscarTodasUseCase: BuscarTodasCulturasUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma cultura' })
  @ApiResponse({
    status: 200,
    description: 'Cultura criado com sucesso.',
    type: CulturaDto,
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async criar(@Body() dto: Cultura): Promise<Cultura> {
    return this.criarUseCase.execute(dto);
  }

  @Put()
  @ApiOperation({ summary: 'Atualizar uma cultura' })
  @ApiResponse({
    status: 200,
    description: 'Cultura atualizado com sucesso.',
    type: CulturaDto,
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async atualizar(@Body() dto: Cultura): Promise<Cultura> {
    return this.atualizarUseCase.execute(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma cultura' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiResponse({
    status: 204,
    description: 'Cultura removido com sucesso.',
    type: CulturaDto,
  })
  async remover(@Param('id') id: string): Promise<void> {
    return this.removerUseCase.execute(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as culturas' })
  @ApiResponse({
    status: 200,
    description: 'Culturas listadas com sucesso.',
    type: CulturaDto,
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async buscarTodas(): Promise<Cultura[]> {
    return this.buscarTodasUseCase.execute();
  }
}
