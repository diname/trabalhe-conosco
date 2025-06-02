import { Safra } from '@Domain/entities/safra.entity';
import { SafraRepository } from '@Domain/repositories/safra.repository';
import { AtualizarSafraUseCase } from './atualiza-safra.use-case';

describe('AtualizarSafraUseCase', () => {
  let useCase: AtualizarSafraUseCase;
  let repo: jest.Mocked<SafraRepository>;

  const safraMock: Safra = {
    id: '1',
    nome: 'Safra 2024',
    ano: 2024,
    fazendaId: '123',
    culturasIds: ['cultura1', 'cultura2'],
  } as Safra;

  beforeEach(() => {
    repo = {
      atualizar: jest.fn(),
    } as unknown as jest.Mocked<SafraRepository>;

    useCase = new AtualizarSafraUseCase(repo);
  });

  it('deve atualizar uma safra com sucesso', async () => {
    repo.atualizar.mockResolvedValue(safraMock);

    const result = await useCase.execute(safraMock);

    expect(repo.atualizar).toHaveBeenCalledWith(safraMock);
    expect(result).toEqual(safraMock);
  });

  it('deve propagar erros do repositório', async () => {
    repo.atualizar.mockRejectedValue(new Error('Erro ao atualizar safra'));

    await expect(useCase.execute(safraMock)).rejects.toThrow(
      'Erro ao atualizar safra',
    );
    expect(repo.atualizar).toHaveBeenCalledWith(safraMock);
  });

  it('deve passar os dados corretos para o repositório', async () => {
    repo.atualizar.mockResolvedValue(safraMock);

    await useCase.execute(safraMock);

    expect(repo.atualizar).toHaveBeenCalledTimes(1);
    expect(repo.atualizar).toHaveBeenCalledWith(
      expect.objectContaining({
        id: safraMock.id,
        ano: safraMock.ano,
      }),
    );
  });

  it('deve retornar a safra atualizada exatamente como retornada pelo repositório', async () => {
    const safraAtualizada: Safra = { ...safraMock };
    repo.atualizar.mockResolvedValue(safraAtualizada);

    const result = await useCase.execute(safraMock);

    expect(result).toBe(safraAtualizada);
  });
});
