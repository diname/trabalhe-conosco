import { CulturaRepository } from '@Domain/repositories/cultura.repository';
import { RemoverCulturaUseCase } from './deleta-cultura.use-case';

describe('RemoverCulturaUseCase', () => {
  let useCase: RemoverCulturaUseCase;
  let repo: jest.Mocked<CulturaRepository>;

  beforeEach(() => {
    repo = {
      remover: jest.fn(),
    } as unknown as jest.Mocked<CulturaRepository>;

    useCase = new RemoverCulturaUseCase(repo);
  });

  it('deve remover uma cultura com sucesso', async () => {
    repo.remover.mockResolvedValue(undefined);

    await expect(useCase.execute('1')).resolves.toBeUndefined();
    expect(repo.remover).toHaveBeenCalledWith('1');
    expect(repo.remover).toHaveBeenCalledTimes(1);
  });

  it('deve propagar erros do repositório', async () => {
    repo.remover.mockRejectedValue(new Error('Erro ao remover cultura'));

    await expect(useCase.execute('1')).rejects.toThrow(
      'Erro ao remover cultura',
    );
    expect(repo.remover).toHaveBeenCalledWith('1');
  });

  it('deve chamar o método remover com o id correto', async () => {
    repo.remover.mockResolvedValue(undefined);

    const id = '123';
    await useCase.execute(id);

    expect(repo.remover).toHaveBeenCalledWith(id);
  });
});
