import { Cultura } from '@Domain/entities/cultura.entity';
import { CulturaRepository } from '@Domain/repositories/cultura.repository';
import { CriarCulturaUseCase } from './cria-cultura.use-case';

describe('CriarCulturaUseCase', () => {
  let useCase: CriarCulturaUseCase;
  let repo: jest.Mocked<CulturaRepository>;

  const culturaMock: Cultura = {
    id: '1',
    nome: 'Milho',
    descricao: 'Cultura de milho',
  } as Cultura;

  beforeEach(() => {
    repo = {
      criar: jest.fn(),
    } as unknown as jest.Mocked<CulturaRepository>;

    useCase = new CriarCulturaUseCase(repo);
  });

  it('deve criar uma cultura com sucesso', async () => {
    repo.criar.mockResolvedValue(culturaMock);

    const result = await useCase.execute(culturaMock);

    expect(repo.criar).toHaveBeenCalledWith(culturaMock);
    expect(result).toEqual(culturaMock);
  });

  it('deve propagar erros do repositório', async () => {
    repo.criar.mockRejectedValue(new Error('Erro ao criar cultura'));

    await expect(useCase.execute(culturaMock)).rejects.toThrow(
      'Erro ao criar cultura',
    );
    expect(repo.criar).toHaveBeenCalledWith(culturaMock);
  });

  it('deve passar os dados corretos para o repositório', async () => {
    repo.criar.mockResolvedValue(culturaMock);

    await useCase.execute(culturaMock);

    expect(repo.criar).toHaveBeenCalledTimes(1);
    expect(repo.criar).toHaveBeenCalledWith(
      expect.objectContaining({
        id: culturaMock.id,
        nome: culturaMock.nome,
      }),
    );
  });

  it('deve retornar a cultura criada exatamente como retornada pelo repositório', async () => {
    const culturaRetornada: Cultura = { ...culturaMock, nome: 'Soja' };
    repo.criar.mockResolvedValue(culturaRetornada);

    const result = await useCase.execute(culturaMock);

    expect(result).toBe(culturaRetornada);
  });
});
