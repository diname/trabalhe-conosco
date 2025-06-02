import { Agricultor } from '@Domain/entities/agricultor.entity';
import { AgricultorRepository } from '@Domain/repositories/agricultor.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CriarAgricultorUseCase {
  constructor(
    @Inject('AgricultorRepository')
    private readonly repo: AgricultorRepository,
  ) {}

  async execute(dados: Agricultor): Promise<Agricultor> {
    return await this.repo.criar(dados);
  }
}
