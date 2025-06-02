import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Agricultor } from '../../domain/entities/agricultor.entity';
import { AgricultorRepository } from '../../domain/repositories/agricultor.repository';

import { AgricultorMapper } from '../typeorm/mappers/agricultor.mapper';
import { AgricultorOrmEntity } from '../typeorm/models/agricultor.model';

@Injectable()
export class AgricultorRepositoryImplt implements AgricultorRepository {
  constructor(
    @InjectRepository(AgricultorOrmEntity)
    private readonly ormRepo: Repository<AgricultorOrmEntity>,
  ) {}

  async criar(agricultor: Agricultor): Promise<Agricultor> {
    const ormEntity = AgricultorMapper.toOrm(agricultor);
    const saved = await this.ormRepo.save(ormEntity);
    return AgricultorMapper.toDomain(saved);
  }

  async atualizar(agricultor: Agricultor): Promise<Agricultor> {
    const ormEntity = AgricultorMapper.toOrm(agricultor);
    const updated = await this.ormRepo.save(ormEntity);
    return AgricultorMapper.toDomain(updated);
  }

  async remover(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async buscarPorId(id: string): Promise<Agricultor | null> {
    const result = await this.ormRepo.findOneBy({ id });
    return result ? AgricultorMapper.toDomain(result) : null;
  }

  async buscar(): Promise<Agricultor[]> {
    const results = await this.ormRepo.find();
    return results.map((result) => AgricultorMapper.toDomain(result));
  }
}
