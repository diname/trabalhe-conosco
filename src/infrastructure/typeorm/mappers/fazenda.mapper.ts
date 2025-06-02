import { Fazenda } from '@Domain/entities/fazenda.entity';
import { FazendaOrmEntity } from '../models/fazenda.model';

export class FazendaMapper {
  static toDomain(orm: FazendaOrmEntity): Fazenda {
    return new Fazenda(
      orm.id,
      orm.nome,
      orm.cidade,
      orm.estado,
      orm.areaTotal,
      orm.areaAgricultavel,
      orm.areaVegetacao,
      orm.agricultorId,
    );
  }

  static toOrm(domain: Fazenda): FazendaOrmEntity {
    const orm = new FazendaOrmEntity();
    orm.id = domain.id;
    orm.nome = domain.nome;
    orm.cidade = domain.cidade;
    orm.estado = domain.estado;
    orm.areaTotal = domain.areaTotal;
    orm.areaAgricultavel = domain.areaAgricultavel;
    orm.areaVegetacao = domain.areaVegetacao;
    orm.agricultorId = domain.agricultorId;
    return orm;
  }
}
