import { Cultura } from '../entities/cultura.entity';

export interface CulturaRepository {
  criar(cultura: Cultura): Promise<Cultura>;
  atualizar(cultura: Cultura): Promise<Cultura>;
  remover(id: string): Promise<void>;
  buscarPorId(id: string): Promise<Cultura | null>;
  buscar(): Promise<Cultura[]>;
}
