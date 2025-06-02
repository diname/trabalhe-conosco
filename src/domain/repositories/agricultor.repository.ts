import { Agricultor } from '../entities/agricultor.entity';

export interface AgricultorRepository {
  criar(agricultor: Agricultor): Promise<Agricultor>;
  atualizar(agricultor: Agricultor): Promise<Agricultor>;
  remover(id: string): Promise<void>;
  buscarPorId(id: string): Promise<Agricultor | null>;
  buscar(): Promise<Agricultor[]>;
}
