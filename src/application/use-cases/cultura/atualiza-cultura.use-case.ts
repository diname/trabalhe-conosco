import { Cultura } from '@Domain/entities/cultura.entity';
import { CulturaRepository } from '@Domain/repositories/cultura.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AtualizarCulturaUseCase {
  constructor(
    @Inject('CulturaRepository') private readonly repo: CulturaRepository,
  ) {}

  async execute(cultura: Cultura): Promise<Cultura> {
    return await this.repo.atualizar(cultura);
  }
}
