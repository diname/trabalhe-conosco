export class Fazenda {
  constructor(
    public id: string,
    public nome: string,
    public cidade: string,
    public estado: string,
    public areaTotal: number,
    public areaAgricultavel: number,
    public areaVegetacao: number,
    public agricultorId: string,
  ) {}
}
