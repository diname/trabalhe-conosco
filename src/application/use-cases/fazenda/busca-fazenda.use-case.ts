import { Fazenda } from '@Domain/entities/fazenda.entity';
import { FazendaRepository } from '@Domain/repositories/fazenda.repository';
import { Inject, Injectable } from '@nestjs/common';
@Injectable()
export class BuscarTodasFazendasUseCase {
  constructor(
    @Inject('FazendaRepository') private readonly repo: FazendaRepository,
  ) {}

  async execute(): Promise<Fazenda[]> {
    return await this.repo.buscar();
  }
}
