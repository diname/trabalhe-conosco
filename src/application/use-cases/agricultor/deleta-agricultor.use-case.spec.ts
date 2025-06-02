import { AgricultorRepository } from '@Domain/repositories/agricultor.repository';
import { RemoverAgricultorUseCase } from './deleta-agricultor.use-case';

describe('RemoverAgricultorUseCase', () => {
  let useCase: RemoverAgricultorUseCase;
  let repository: jest.Mocked<AgricultorRepository>;

  beforeEach(() => {
    repository = {
      criar: jest.fn(),
      atualizar: jest.fn(),
      remover: jest.fn(),
      buscarPorId: jest.fn(),
      buscar: jest.fn(),
    };
    useCase = new RemoverAgricultorUseCase(repository);
  });

  it('should delete an agricultor', async () => {
    repository.remover.mockResolvedValue(undefined);

    await useCase.execute('1');

    expect(repository.remover).toHaveBeenCalledWith('1');
  });
});
