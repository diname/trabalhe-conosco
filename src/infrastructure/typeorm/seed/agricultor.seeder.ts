import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AgricultorOrmEntity } from '../models/agricultor.model';
import { SeederBase } from './seed-base.seeder';

@Injectable()
export class AgricultorSeeder extends SeederBase<AgricultorOrmEntity> {
  constructor(dataSource: DataSource) {
    const repository = dataSource.getRepository(AgricultorOrmEntity);
    super(repository);
    this.tableName = 'Category';
  }

  protected dataToSeed(): AgricultorOrmEntity[] {
    return [
      { id: 'agricultor-1', nome: 'João Silva', documento: '12345678900' },
    ] as AgricultorOrmEntity[];
  }
}
