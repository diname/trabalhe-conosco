import { CulturaRepository } from '@Domain/repositories/cultura.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RemoverCulturaUseCase {
  constructor(
    @Inject('CulturaRepository') private readonly repo: CulturaRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.remover(id);
  }
}
