import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SafraOrmEntity } from '../models/safra.model';
import { SeederBase } from './seed-base.seeder';

@Injectable()
export class SafraSeeder extends SeederBase<SafraOrmEntity> {
  constructor(dataSource: DataSource) {
    const repository = dataSource.getRepository(SafraOrmEntity);
    super(repository);
    this.tableName = 'Category';
  }

  protected dataToSeed(): SafraOrmEntity[] {
    const fazenda = { id: 'fazenda-1' };
    const cultura1 = { id: 'cultura-1' };
    const cultura2 = { id: 'cultura-2' };

    return [
      {
        id: 'safra-1',
        ano: 2024,
        fazendaId: fazenda.id,
        culturasIds: [cultura1.id, cultura2.id],
      },
    ] as SafraOrmEntity[];
  }
}
