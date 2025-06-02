import { Cultura } from '@Domain/entities/cultura.entity';
import { CulturaRepository } from '@Domain/repositories/cultura.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class BuscarTodasCulturasUseCase {
  constructor(
    @Inject('CulturaRepository') private readonly repo: CulturaRepository,
  ) {}

  async execute(): Promise<Cultura[]> {
    return await this.repo.buscar();
  }
}
