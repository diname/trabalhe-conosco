import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Fazenda } from '../../domain/entities/fazenda.entity';
import { FazendaRepository } from '../../domain/repositories/fazenda.repository';
import { FazendaMapper } from '../typeorm/mappers/fazenda.mapper';
import { FazendaOrmEntity } from '../typeorm/models/fazenda.model';

@Injectable()
export class FazendaRepositoryImplt implements FazendaRepository {
  constructor(
    @InjectRepository(FazendaOrmEntity)
    private readonly ormRepo: Repository<FazendaOrmEntity>,
  ) {}

  async criar(fazenda: Fazenda): Promise<Fazenda> {
    const orm = FazendaMapper.toOrm(fazenda);
    const saved = await this.ormRepo.save(orm);
    return FazendaMapper.toDomain(saved);
  }

  async atualizar(fazenda: Fazenda): Promise<Fazenda> {
    const orm = FazendaMapper.toOrm(fazenda);
    const updated = await this.ormRepo.save(orm);
    return FazendaMapper.toDomain(updated);
  }

  async remover(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async buscarPorId(id: string): Promise<Fazenda | null> {
    const result = await this.ormRepo.findOneBy({ id });
    return result ? FazendaMapper.toDomain(result) : null;
  }

  async buscar(): Promise<Fazenda[]> {
    const results = await this.ormRepo.find();
    return results.map((result) => FazendaMapper.toDomain(result));
  }
}
