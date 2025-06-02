import { Agricultor } from '@Domain/entities/agricultor.entity';
import { AgricultorOrmEntity } from '../models/agricultor.model';

export class AgricultorMapper {
  static toDomain(orm: AgricultorOrmEntity): Agricultor {
    return new Agricultor(orm.id, orm.documento, orm.nome);
  }

  static toOrm(domain: Agricultor): AgricultorOrmEntity {
    const orm = new AgricultorOrmEntity();
    orm.id = domain.id;
    orm.documento = domain.documento;
    orm.nome = domain.nome;
    return orm;
  }
}
