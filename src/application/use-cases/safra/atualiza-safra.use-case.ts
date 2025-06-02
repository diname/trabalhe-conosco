import { Safra } from '@Domain/entities/safra.entity';
import { SafraRepository } from '@Domain/repositories/safra.repository';
import { Inject, Injectable } from '@nestjs/common';
@Injectable()
export class AtualizarSafraUseCase {
  constructor(
    @Inject('SafraRepository') private readonly repo: SafraRepository,
  ) {}

  async execute(safra: Safra): Promise<Safra> {
    return await this.repo.atualizar(safra);
  }
}
