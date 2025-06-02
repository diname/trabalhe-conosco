import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CulturaOrmEntity } from '../models/cultura.model';
import { SeederBase } from './seed-base.seeder';

@Injectable()
export class CulturaSeeder extends SeederBase<CulturaOrmEntity> {
  constructor(dataSource: DataSource) {
    const repository = dataSource.getRepository(CulturaOrmEntity);
    super(repository);
    this.tableName = 'Category';
  }

  protected dataToSeed(): CulturaOrmEntity[] {
    return [
      { id: 'cultura-1', nome: 'Milho' },
      { id: 'cultura-2', nome: 'Soja' },
    ] as CulturaOrmEntity[];
  }
}
