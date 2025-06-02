import { Fazenda } from '@Domain/entities/fazenda.entity';
import { FazendaRepository } from '@Domain/repositories/fazenda.repository';
import { BuscarTodasFazendasUseCase } from './busca-fazenda.use-case';

describe('BuscarTodasFazendasUseCase', () => {
  let useCase: BuscarTodasFazendasUseCase;
  let repo: jest.Mocked<FazendaRepository>;

  const fazendasMock: Fazenda[] = [
    {
      id: '1',
      nome: 'Fazenda Boa Vista',
      localizacao: 'Minas Gerais',
      cidade: 'Uberlândia',
      estado: 'MG',
      areaTotal: 1000,
      areaAgricultavel: 800,
      areaVegetacao: 200,
      produtividade: 500,
      agricultorId: 'agricultor-1',
    } as Fazenda,
    {
      id: '2',
      nome: 'Fazenda Nova',
      localizacao: 'São Paulo',
      cidade: 'Ribeirão Preto',
      estado: 'SP',
      areaTotal: 1500,
      areaAgricultavel: 1200,
      areaVegetacao: 300,
      produtividade: 700,
      agricultorId: 'agricultor-2',
    } as Fazenda,
  ];

  beforeEach(() => {
    repo = {
      buscar: jest.fn(),
    } as unknown as jest.Mocked<FazendaRepository>;

    useCase = new BuscarTodasFazendasUseCase(repo);
  });

  it('deve retornar todas as fazendas do repositório', async () => {
    repo.buscar.mockResolvedValue(fazendasMock);

    const result = await useCase.execute();

    expect(repo.buscar).toHaveBeenCalledTimes(1);
    expect(result).toEqual(fazendasMock);
  });

  it('deve retornar um array vazio se não houver fazendas', async () => {
    repo.buscar.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(repo.buscar).toHaveBeenCalledTimes(1);
  });

  it('deve propagar erros do repositório', async () => {
    repo.buscar.mockRejectedValue(new Error('Erro ao buscar fazendas'));

    await expect(useCase.execute()).rejects.toThrow('Erro ao buscar fazendas');
    expect(repo.buscar).toHaveBeenCalledTimes(1);
  });
});
