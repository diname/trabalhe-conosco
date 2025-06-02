export class Safra {
  constructor(
    public id: string,
    public ano: number,
    public fazendaId: string,
    public culturasIds: string[] = [],
  ) {}
}
