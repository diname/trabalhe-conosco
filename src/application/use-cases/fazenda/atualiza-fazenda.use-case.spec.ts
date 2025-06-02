import { Fazenda } from '@Domain/entities/fazenda.entity';
import { FazendaRepository } from '@Domain/repositories/fazenda.repository';
import { AtualizarFazendaUseCase } from './atualiza-fazenda.use-case';

describe('AtualizarFazendaUseCase', () => {
  let useCase: AtualizarFazendaUseCase;
  let repo: jest.Mocked<FazendaRepository>;

  const fazendaMock: Fazenda = {
    id: '1',
    nome: 'Fazenda Boa Vista',
    cidade: 'Uberlândia',
    estado: 'MG',
    areaTotal: 1000,
    areaAgricultavel: 800,
    areaVegetacao: 200,
    agricultorId: '123',
  };

  beforeEach(() => {
    repo = {
      atualizar: jest.fn(),
    } as unknown as jest.Mocked<FazendaRepository>;

    useCase = new AtualizarFazendaUseCase(repo);
  });

  it('deve atualizar uma fazenda com sucesso', async () => {
    repo.atualizar.mockResolvedValue(fazendaMock);

    const result = await useCase.execute(fazendaMock);

    expect(repo.atualizar).toHaveBeenCalledWith(fazendaMock);
    expect(result).toEqual(fazendaMock);
  });

  it('deve propagar erros do repositório', async () => {
    repo.atualizar.mockRejectedValue(new Error('Erro ao atualizar fazenda'));

    await expect(useCase.execute(fazendaMock)).rejects.toThrow(
      'Erro ao atualizar fazenda',
    );
    expect(repo.atualizar).toHaveBeenCalledWith(fazendaMock);
  });

  it('deve passar os dados corretos para o repositório', async () => {
    repo.atualizar.mockResolvedValue(fazendaMock);

    await useCase.execute(fazendaMock);

    expect(repo.atualizar).toHaveBeenCalledTimes(1);
    expect(repo.atualizar).toHaveBeenCalledWith(
      expect.objectContaining({
        id: fazendaMock.id,
        nome: fazendaMock.nome,
      }),
    );
  });

  it('deve retornar a fazenda atualizada exatamente como retornada pelo repositório', async () => {
    const fazendaAtualizada: Fazenda = { ...fazendaMock, nome: 'Fazenda Nova' };
    repo.atualizar.mockResolvedValue(fazendaAtualizada);

    const result = await useCase.execute(fazendaMock);

    expect(result).toBe(fazendaAtualizada);
  });
});
