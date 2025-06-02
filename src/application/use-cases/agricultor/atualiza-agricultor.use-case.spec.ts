import { Agricultor } from '@Domain/entities/agricultor.entity';
import { AgricultorRepository } from '@Domain/repositories/agricultor.repository';
import { AtualizarAgricultorUseCase } from './atualiza-agricultor.use-case';

describe('AtualizarAgricultorUseCase', () => {
  let useCase: AtualizarAgricultorUseCase;
  let repo: jest.Mocked<AgricultorRepository>;

  const agricultorMock: Agricultor = {
    id: '1',
    nome: 'João da Silva',
    documento: '12345678900',
    fazendasIds: ['fazenda-1', 'fazenda-2'],
  } as Agricultor;

  beforeEach(() => {
    repo = {
      atualizar: jest.fn(),
    } as unknown as jest.Mocked<AgricultorRepository>;

    useCase = new AtualizarAgricultorUseCase(repo);
  });

  it('deve atualizar um agricultor com sucesso', async () => {
    repo.atualizar.mockResolvedValue(agricultorMock);

    const result = await useCase.execute(agricultorMock);

    expect(repo.atualizar).toHaveBeenCalledWith(agricultorMock);
    expect(result).toEqual(agricultorMock);
  });

  it('deve propagar erros do repositório', async () => {
    repo.atualizar.mockRejectedValue(new Error('Erro ao atualizar agricultor'));

    await expect(useCase.execute(agricultorMock)).rejects.toThrow(
      'Erro ao atualizar agricultor',
    );
    expect(repo.atualizar).toHaveBeenCalledWith(agricultorMock);
  });

  it('deve passar os dados corretos para o repositório', async () => {
    repo.atualizar.mockResolvedValue(agricultorMock);

    await useCase.execute(agricultorMock);

    expect(repo.atualizar).toHaveBeenCalledTimes(1);
    expect(repo.atualizar).toHaveBeenCalledWith(
      expect.objectContaining({
        id: agricultorMock.id,
        nome: agricultorMock.nome,
        documento: agricultorMock.documento,
      }),
    );
  });

  it('deve retornar o agricultor atualizado exatamente como retornado pelo repositório', async () => {
    const agricultorAtualizado: Agricultor = {
      ...agricultorMock,
      nome: 'Maria',
    };
    repo.atualizar.mockResolvedValue(agricultorAtualizado);

    const result = await useCase.execute(agricultorMock);

    expect(result).toBe(agricultorAtualizado);
  });
});
