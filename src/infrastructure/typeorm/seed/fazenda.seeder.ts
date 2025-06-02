import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FazendaOrmEntity } from '../models/fazenda.model';
import { SeederBase } from './seed-base.seeder';

@Injectable()
export class FazendaSeeder extends SeederBase<FazendaOrmEntity> {
  constructor(dataSource: DataSource) {
    const repository = dataSource.getRepository(FazendaOrmEntity);
    super(repository);
    this.tableName = 'Category';
  }

  protected dataToSeed(): FazendaOrmEntity[] {
    const agricultorId = 'agricultor-1';
    return [
      {
        id: 'fazenda-1',
        nome: 'Fazenda Alegre',
        cidade: 'Londrina',
        estado: 'PR',
        areaTotal: 1000,
        areaAgricultavel: 700,
        areaVegetacao: 300,
        agricultorId: agricultorId,
      },
    ] as FazendaOrmEntity[];
  }
}
