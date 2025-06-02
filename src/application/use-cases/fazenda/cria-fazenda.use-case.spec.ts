import { Fazenda } from '@Domain/entities/fazenda.entity';
import { FazendaRepository } from '@Domain/repositories/fazenda.repository';
import { CriarFazendaUseCase } from './cria-fazenda.use-case';

describe('CriarFazendaUseCase', () => {
  let useCase: CriarFazendaUseCase;
  let repo: jest.Mocked<FazendaRepository>;

  const fazendaMock: Fazenda = {
    id: '1',
    nome: 'Fazenda Boa Vista',
    cidade: 'Uberlândia',
    estado: 'MG',
    areaTotal: 1000,
    areaAgricultavel: 800,
    areaVegetacao: 200,
    agricultorId: '123',
  };

  beforeEach(() => {
    repo = {
      criar: jest.fn(),
    } as unknown as jest.Mocked<FazendaRepository>;

    useCase = new CriarFazendaUseCase(repo);
  });

  it('deve criar uma fazenda com sucesso', async () => {
    repo.criar.mockResolvedValue(fazendaMock);

    const result = await useCase.execute(fazendaMock);

    expect(repo.criar).toHaveBeenCalledWith(fazendaMock);
    expect(result).toEqual(fazendaMock);
  });

  it('deve propagar erros do repositório', async () => {
    repo.criar.mockRejectedValue(new Error('Erro ao criar fazenda'));

    await expect(useCase.execute(fazendaMock)).rejects.toThrow(
      'Erro ao criar fazenda',
    );
    expect(repo.criar).toHaveBeenCalledWith(fazendaMock);
  });

  it('deve passar os dados corretos para o repositório', async () => {
    repo.criar.mockResolvedValue(fazendaMock);

    await useCase.execute(fazendaMock);

    expect(repo.criar).toHaveBeenCalledTimes(1);
    expect(repo.criar).toHaveBeenCalledWith(
      expect.objectContaining({
        id: fazendaMock.id,
        nome: fazendaMock.nome,
        cidade: fazendaMock.cidade,
      }),
    );
  });

  it('deve retornar a fazenda criada exatamente como retornada pelo repositório', async () => {
    const fazendaRetornada: Fazenda = { ...fazendaMock, nome: 'Fazenda Nova' };
    repo.criar.mockResolvedValue(fazendaRetornada);

    const result = await useCase.execute(fazendaMock);

    expect(result).toBe(fazendaRetornada);
  });
});
