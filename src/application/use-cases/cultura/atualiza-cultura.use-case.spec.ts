import { Cultura } from '@Domain/entities/cultura.entity';
import { CulturaRepository } from '@Domain/repositories/cultura.repository';
import { AtualizarCulturaUseCase } from './atualiza-cultura.use-case';

describe('AtualizarCulturaUseCase', () => {
  let useCase: AtualizarCulturaUseCase;
  let repo: jest.Mocked<CulturaRepository>;

  const culturaMock: Cultura = {
    id: '1',
    nome: 'Milho',
    descricao: 'Cultura de milho',
  } as Cultura;

  beforeEach(() => {
    repo = {
      atualizar: jest.fn(),
    } as unknown as jest.Mocked<CulturaRepository>;

    useCase = new AtualizarCulturaUseCase(repo);
  });

  it('deve atualizar uma cultura com sucesso', async () => {
    repo.atualizar.mockResolvedValue(culturaMock);

    const result = await useCase.execute(culturaMock);

    expect(repo.atualizar).toHaveBeenCalledWith(culturaMock);
    expect(result).toEqual(culturaMock);
  });

  it('deve propagar erros do repositório', async () => {
    repo.atualizar.mockRejectedValue(new Error('Erro ao atualizar cultura'));

    await expect(useCase.execute(culturaMock)).rejects.toThrow(
      'Erro ao atualizar cultura',
    );
    expect(repo.atualizar).toHaveBeenCalledWith(culturaMock);
  });

  it('deve passar os dados corretos para o repositório', async () => {
    repo.atualizar.mockResolvedValue(culturaMock);

    await useCase.execute(culturaMock);

    expect(repo.atualizar).toHaveBeenCalledTimes(1);
    expect(repo.atualizar).toHaveBeenCalledWith(
      expect.objectContaining({
        id: culturaMock.id,
        nome: culturaMock.nome,
      }),
    );
  });

  it('deve retornar a cultura atualizada exatamente como retornada pelo repositório', async () => {
    const culturaAtualizada: Cultura = { ...culturaMock, nome: 'Soja' };
    repo.atualizar.mockResolvedValue(culturaAtualizada);

    const result = await useCase.execute(culturaMock);

    expect(result).toBe(culturaAtualizada);
  });
});
