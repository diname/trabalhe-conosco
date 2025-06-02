import { Cultura } from '@Domain/entities/cultura.entity';
import { CulturaOrmEntity } from '../models/cultura.model';

export class CulturaMapper {
  static toDomain(orm: CulturaOrmEntity): Cultura {
    return new Cultura(orm.id, orm.nome);
  }

  static toOrm(domain: Cultura): CulturaOrmEntity {
    const orm = new CulturaOrmEntity();
    orm.id = domain.id;
    orm.nome = domain.nome;
    return orm;
  }
}
