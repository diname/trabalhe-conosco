import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Safra } from '../../domain/entities/safra.entity';
import { SafraRepository } from '../../domain/repositories/safra.repository';
import { SafraMapper } from '../typeorm/mappers/safra.mapper';
import { SafraOrmEntity } from '../typeorm/models/safra.model';

@Injectable()
export class SafraRepositoryImplt implements SafraRepository {
  constructor(
    @InjectRepository(SafraOrmEntity)
    private readonly ormRepo: Repository<SafraOrmEntity>,
  ) {}

  async criar(safra: Safra): Promise<Safra> {
    const orm = SafraMapper.toOrm(safra);
    const saved = await this.ormRepo.save(orm);
    return SafraMapper.toDomain(saved);
  }

  async atualizar(safra: Safra): Promise<Safra> {
    const orm = SafraMapper.toOrm(safra);
    const updated = await this.ormRepo.save(orm);
    return SafraMapper.toDomain(updated);
  }

  async remover(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async buscarPorId(id: string): Promise<Safra | null> {
    const result = await this.ormRepo.findOneBy({ id });
    return result ? SafraMapper.toDomain(result) : null;
  }

  async buscar(): Promise<Safra[]> {
    const results = await this.ormRepo.find();
    return results.map((result) => SafraMapper.toDomain(result));
  }
}
