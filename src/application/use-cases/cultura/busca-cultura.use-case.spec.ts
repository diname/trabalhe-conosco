import { Cultura } from '@Domain/entities/cultura.entity';
import { CulturaRepository } from '@Domain/repositories/cultura.repository';
import { BuscarTodasCulturasUseCase } from './busca-cultura.use-case';

describe('BuscarTodasCulturasUseCase', () => {
  let useCase: BuscarTodasCulturasUseCase;
  let repo: jest.Mocked<CulturaRepository>;

  const culturasMock: Cultura[] = [
    {
      id: '1',
      nome: 'Milho',
      descricao: 'Cultura de milho',
    } as Cultura,
    {
      id: '2',
      nome: 'Soja',
      descricao: 'Cultura de soja',
    } as Cultura,
  ];

  beforeEach(() => {
    repo = {
      buscar: jest.fn(),
    } as unknown as jest.Mocked<CulturaRepository>;

    useCase = new BuscarTodasCulturasUseCase(repo);
  });

  it('deve retornar todas as culturas do repositório', async () => {
    repo.buscar.mockResolvedValue(culturasMock);

    const result = await useCase.execute();

    expect(repo.buscar).toHaveBeenCalledTimes(1);
    expect(result).toEqual(culturasMock);
  });

  it('deve retornar um array vazio se não houver culturas', async () => {
    repo.buscar.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(repo.buscar).toHaveBeenCalledTimes(1);
  });

  it('deve propagar erros do repositório', async () => {
    repo.buscar.mockRejectedValue(new Error('Erro ao buscar culturas'));

    await expect(useCase.execute()).rejects.toThrow('Erro ao buscar culturas');
    expect(repo.buscar).toHaveBeenCalledTimes(1);
  });
});
