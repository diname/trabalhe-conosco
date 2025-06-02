import { Agricultor } from '@Domain/entities/agricultor.entity';
import { AgricultorRepository } from '@Domain/repositories/agricultor.repository';
import { BuscarTodosAgricultoresUseCase } from './busca-agricultor.use-case';

describe('BuscarTodosAgricultoresUseCase', () => {
  let useCase: BuscarTodosAgricultoresUseCase;
  let repo: jest.Mocked<AgricultorRepository>;

  const agricultoresMock: Agricultor[] = [
    {
      id: '1',
      nome: 'João da Silva',
      documento: '12345678900',
      fazendasIds: ['fazenda-1'],
    } as Agricultor,
    {
      id: '2',
      nome: 'Maria Oliveira',
      documento: '98765432100',
      fazendasIds: ['fazenda-2'],
    } as Agricultor,
  ];

  beforeEach(() => {
    repo = {
      buscar: jest.fn(),
    } as unknown as jest.Mocked<AgricultorRepository>;

    useCase = new BuscarTodosAgricultoresUseCase(repo);
  });

  it('deve retornar todos os agricultores do repositório', async () => {
    repo.buscar.mockResolvedValue(agricultoresMock);

    const result = await useCase.execute();

    expect(repo.buscar).toHaveBeenCalledTimes(1);
    expect(result).toEqual(agricultoresMock);
  });

  it('deve retornar um array vazio se não houver agricultores', async () => {
    repo.buscar.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(repo.buscar).toHaveBeenCalledTimes(1);
  });

  it('deve propagar erros do repositório', async () => {
    repo.buscar.mockRejectedValue(new Error('Erro ao buscar agricultores'));

    await expect(useCase.execute()).rejects.toThrow(
      'Erro ao buscar agricultores',
    );
    expect(repo.buscar).toHaveBeenCalledTimes(1);
  });

  it('deve chamar o método buscarTodos sem parâmetros', async () => {
    repo.buscar.mockResolvedValue(agricultoresMock);

    await useCase.execute();

    expect(repo.buscar).toHaveBeenCalledWith();
  });
});
