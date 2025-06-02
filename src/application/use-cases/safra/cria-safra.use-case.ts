import { Safra } from '@Domain/entities/safra.entity';
import { SafraRepository } from '@Domain/repositories/safra.repository';
import { Inject, Injectable } from '@nestjs/common';
@Injectable()
export class CriarSafraUseCase {
  constructor(
    @Inject('SafraRepository') private readonly repo: SafraRepository,
  ) {}

  async execute(dados: Safra): Promise<Safra> {
    return await this.repo.criar(dados);
  }
}
