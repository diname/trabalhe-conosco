import { FazendaRepository } from '@Domain/repositories/fazenda.repository';
import { RemoverFazendaUseCase } from './deleta-fazenda.use-case';

describe('RemoverFazendaUseCase', () => {
  let useCase: RemoverFazendaUseCase;
  let repo: jest.Mocked<FazendaRepository>;

  beforeEach(() => {
    repo = {
      remover: jest.fn(),
    } as unknown as jest.Mocked<FazendaRepository>;

    useCase = new RemoverFazendaUseCase(repo);
  });

  it('deve remover uma fazenda com sucesso', async () => {
    repo.remover.mockResolvedValue(undefined);

    await expect(useCase.execute('1')).resolves.toBeUndefined();
    expect(repo.remover).toHaveBeenCalledWith('1');
    expect(repo.remover).toHaveBeenCalledTimes(1);
  });

  it('deve propagar erros do repositório', async () => {
    repo.remover.mockRejectedValue(new Error('Erro ao remover fazenda'));

    await expect(useCase.execute('1')).rejects.toThrow(
      'Erro ao remover fazenda',
    );
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
  });
});
