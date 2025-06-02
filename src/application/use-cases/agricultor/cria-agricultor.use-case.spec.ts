import { Agricultor } from '@Domain/entities/agricultor.entity';
import { AgricultorRepository } from '@Domain/repositories/agricultor.repository';
import { CriarAgricultorUseCase } from './cria-agricultor.use-case';

describe('CriarAgricultorUseCase', () => {
  let useCase: CriarAgricultorUseCase;
  let repo: jest.Mocked<AgricultorRepository>;

  const agricultorMock: Agricultor = {
    id: '1',
    nome: 'João da Silva',
    documento: '12345678900',
    fazendasIds: ['fazenda-1', 'fazenda-2'],
  } as Agricultor;

  beforeEach(() => {
    repo = {
      criar: jest.fn(),
    } as unknown as jest.Mocked<AgricultorRepository>;

    useCase = new CriarAgricultorUseCase(repo);
  });

  it('deve criar um agricultor com sucesso', async () => {
    repo.criar.mockResolvedValue(agricultorMock);

    const result = await useCase.execute(agricultorMock);

    expect(repo.criar).toHaveBeenCalledWith(agricultorMock);
    expect(result).toEqual(agricultorMock);
  });

  it('deve propagar erros do repositório', async () => {
    repo.criar.mockRejectedValue(new Error('Erro ao criar agricultor'));

    await expect(useCase.execute(agricultorMock)).rejects.toThrow(
      'Erro ao criar agricultor',
    );
    expect(repo.criar).toHaveBeenCalledWith(agricultorMock);
  });

  it('deve passar os dados corretos para o repositório', async () => {
    repo.criar.mockResolvedValue(agricultorMock);

    await useCase.execute(agricultorMock);

    expect(repo.criar).toHaveBeenCalledTimes(1);
    expect(repo.criar).toHaveBeenCalledWith(
      expect.objectContaining({
        id: agricultorMock.id,
        nome: agricultorMock.nome,
        documento: agricultorMock.documento,
      }),
    );
  });

  it('deve retornar o agricultor criado exatamente como retornado pelo repositório', async () => {
    const agricultorRetornado: Agricultor = {
      ...agricultorMock,
      nome: 'Maria',
    };
    repo.criar.mockResolvedValue(agricultorRetornado);

    const result = await useCase.execute(agricultorMock);

    expect(result).toBe(agricultorRetornado);
  });
});
