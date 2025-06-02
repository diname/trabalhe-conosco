import { Safra } from '@Domain/entities/safra.entity';
import { SafraRepository } from '@Domain/repositories/safra.repository';
import { CriarSafraUseCase } from './cria-safra.use-case';

describe('CriarSafraUseCase', () => {
  let useCase: CriarSafraUseCase;
  let repo: jest.Mocked<SafraRepository>;

  const safraMock: Safra = {
    id: '1',
    nome: 'Safra 2024',
    ano: 2024,
    fazendaId: 'fazenda-1',
    culturasIds: ['cultura-1', 'cultura-2'],
  } as Safra;

  beforeEach(() => {
    repo = {
      criar: jest.fn(),
    } as unknown as jest.Mocked<SafraRepository>;

    useCase = new CriarSafraUseCase(repo);
  });

  it('deve criar uma safra com sucesso', async () => {
    repo.criar.mockResolvedValue(safraMock);

    const result = await useCase.execute(safraMock);

    expect(repo.criar).toHaveBeenCalledWith(safraMock);
    expect(result).toEqual(safraMock);
  });

  it('deve propagar erros do repositório', async () => {
    repo.criar.mockRejectedValue(new Error('Erro ao criar safra'));

    await expect(useCase.execute(safraMock)).rejects.toThrow(
      'Erro ao criar safra',
    );
    expect(repo.criar).toHaveBeenCalledWith(safraMock);
  });

  it('deve passar os dados corretos para o repositório', async () => {
    repo.criar.mockResolvedValue(safraMock);

    await useCase.execute(safraMock);

    expect(repo.criar).toHaveBeenCalledTimes(1);
    expect(repo.criar).toHaveBeenCalledWith(
      expect.objectContaining({
        id: safraMock.id,
        ano: safraMock.ano,
      }),
    );
  });

  it('deve retornar a safra criada exatamente como retornada pelo repositório', async () => {
    const safraRetornada: Safra = { ...safraMock };
    repo.criar.mockResolvedValue(safraRetornada);

    const result = await useCase.execute(safraMock);

    expect(result).toBe(safraRetornada);
  });
});
