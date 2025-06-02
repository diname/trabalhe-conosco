import { Agricultor } from '@Domain/entities/agricultor.entity';
import { AgricultorRepository } from '@Domain/repositories/agricultor.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AtualizarAgricultorUseCase {
  constructor(
    @Inject('AgricultorRepository')
    private readonly repo: AgricultorRepository,
  ) {}

  async execute(agricultor: Agricultor): Promise<Agricultor> {
    return await this.repo.atualizar(agricultor);
  }
}
