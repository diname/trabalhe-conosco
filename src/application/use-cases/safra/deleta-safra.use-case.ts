import { SafraRepository } from '@Domain/repositories/safra.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RemoverSafraUseCase {
  constructor(
    @Inject('SafraRepository') private readonly repo: SafraRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.remover(id);
  }
}
