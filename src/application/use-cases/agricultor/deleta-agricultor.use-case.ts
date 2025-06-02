import { AgricultorRepository } from '@Domain/repositories/agricultor.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RemoverAgricultorUseCase {
  constructor(
    @Inject('AgricultorRepository')
    private readonly repo: AgricultorRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.remover(id);
  }
}
