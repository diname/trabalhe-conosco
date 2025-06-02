import { Safra } from '@Domain/entities/safra.entity';
import { SafraOrmEntity } from '../models/safra.model';

export class SafraMapper {
  static toDomain(orm: SafraOrmEntity): Safra {
    return new Safra(orm.id, orm.ano, orm.fazendaId, orm.culturasIds);
  }

  static toOrm(domain: Safra): SafraOrmEntity {
    const orm = new SafraOrmEntity();
    orm.id = domain.id;
    orm.ano = domain.ano;
    orm.fazendaId = domain.fazendaId;
    orm.culturasIds = domain.culturasIds;
    return orm;
  }
}
