import { Safra } from '@Domain/entities/safra.entity';
import { SafraRepository } from '@Domain/repositories/safra.repository';
import { BuscarTodasSafrasUseCase } from './busca-safra.use-case';

describe('BuscarTodasSafrasUseCase', () => {
  let useCase: BuscarTodasSafrasUseCase;
  let repo: jest.Mocked<SafraRepository>;

  const safrasMock: Safra[] = [
    {
      id: '1',
      nome: 'Safra 2024',
      ano: 2024,
      fazendaId: 'fazenda-id-1',
      culturasIds: [],
    } as Safra,
    {
      id: '2',
      nome: 'Safra 2023',
      ano: 2023,
      fazendaId: 'some-fazenda-id',
      culturasIds: [],
    } as Safra,
  ];

  beforeEach(() => {
    repo = {
      buscar: jest.fn(),
    } as unknown as jest.Mocked<SafraRepository>;

    useCase = new BuscarTodasSafrasUseCase(repo);
  });

  it('deve retornar todas as safras do repositório', async () => {
    repo.buscar.mockResolvedValue(safrasMock);

    const result = await useCase.execute();

    expect(repo.buscar).toHaveBeenCalledTimes(1);
    expect(result).toEqual(safrasMock);
  });

  it('deve retornar um array vazio se não houver safras', async () => {
    repo.buscar.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(repo.buscar).toHaveBeenCalledTimes(1);
  });

  it('deve propagar erros do repositório', async () => {
    repo.buscar.mockRejectedValue(new Error('Erro ao buscar safras'));

    await expect(useCase.execute()).rejects.toThrow('Erro ao buscar safras');
    expect(repo.buscar).toHaveBeenCalledTimes(1);
  });
});
