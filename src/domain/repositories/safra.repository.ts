import { Safra } from '../entities/safra.entity';

export interface SafraRepository {
  criar(safra: Safra): Promise<Safra>;
  atualizar(safra: Safra): Promise<Safra>;
  remover(id: string): Promise<void>;
  buscarPorId(id: string): Promise<Safra | null>;
  buscar(): Promise<Safra[]>;
}
