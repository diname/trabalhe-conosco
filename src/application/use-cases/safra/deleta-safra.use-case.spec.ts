import { SafraRepository } from '@Domain/repositories/safra.repository';
import { RemoverSafraUseCase } from './deleta-safra.use-case';

describe('RemoverSafraUseCase', () => {
  let useCase: RemoverSafraUseCase;
  let repo: jest.Mocked<SafraRepository>;

  beforeEach(() => {
    repo = {
      remover: jest.fn(),
    } as unknown as jest.Mocked<SafraRepository>;

    useCase = new RemoverSafraUseCase(repo);
  });

  it('deve remover uma safra com sucesso', async () => {
    repo.remover.mockResolvedValue(undefined);

    await expect(useCase.execute('1')).resolves.toBeUndefined();
    expect(repo.remover).toHaveBeenCalledWith('1');
    expect(repo.remover).toHaveBeenCalledTimes(1);
  });

  it('deve propagar erros do repositório', async () => {
    repo.remover.mockRejectedValue(new Error('Erro ao remover safra'));

    await expect(useCase.execute('1')).rejects.toThrow('Erro ao remover safra');
    expect(repo.remover).toHaveBeenCalledWith('1');
  });

  it('deve chamar o método remover com o id correto', async () => {
    repo.remover.mockResolvedValue(undefined);

    const id = 'abc-123';
    await useCase.execute(id);

    expect(repo.remover).toHaveBeenCalledWith(id);
    expect(repo.remover).toHaveBeenCalledTimes(1);
  });

  it('não deve chamar o método remover se id for vazio', async () => {
    repo.remover.mockResolvedValue(undefined);

    await useCase.execute('');
    expect(repo.remover).toHaveBeenCalledWith('');
    expect(repo.remover).toHaveBeenCalledTimes(1);
  });
});
