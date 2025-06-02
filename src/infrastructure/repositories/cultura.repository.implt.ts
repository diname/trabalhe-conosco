import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cultura } from '../../domain/entities/cultura.entity';
import { CulturaRepository } from '../../domain/repositories/cultura.repository';
import { CulturaMapper } from '../typeorm/mappers/cultura.mapper';
import { CulturaOrmEntity } from '../typeorm/models/cultura.model';

@Injectable()
export class CulturaRepositoryImplt implements CulturaRepository {
  constructor(
    @InjectRepository(CulturaOrmEntity)
    private readonly ormRepo: Repository<CulturaOrmEntity>,
  ) {}

  async criar(cultura: Cultura): Promise<Cultura> {
    const orm = CulturaMapper.toOrm(cultura);
    const saved = await this.ormRepo.save(orm);
    return CulturaMapper.toDomain(saved);
  }

  async atualizar(cultura: Cultura): Promise<Cultura> {
    const orm = CulturaMapper.toOrm(cultura);
    const updated = await this.ormRepo.save(orm);
    return CulturaMapper.toDomain(updated);
  }

  async remover(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async buscarPorId(id: string): Promise<Cultura | null> {
    const result = await this.ormRepo.findOneBy({ id });
    return result ? CulturaMapper.toDomain(result) : null;
  }

  async buscar(): Promise<Cultura[]> {
    const results = await this.ormRepo.find();
    return results.map((result) => CulturaMapper.toDomain(result));
  }
}
