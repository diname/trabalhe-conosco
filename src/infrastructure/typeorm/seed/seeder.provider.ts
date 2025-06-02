import { Injectable, OnModuleInit } from '@nestjs/common';
import { AgricultorSeeder } from './agricultor.seeder';
import { CulturaSeeder } from './cultura.seeder';
import { FazendaSeeder } from './fazenda.seeder';
import { SafraSeeder } from './safra.seeder';

@Injectable()
export class SeederProvider implements OnModuleInit {
  constructor(
    private readonly agricultorSeeder: AgricultorSeeder,
    private readonly culturaSeeder: CulturaSeeder,
    private readonly fazendaSeeder: FazendaSeeder,
    private readonly safraSeeder: SafraSeeder,
  ) {}

  async onModuleInit() {
    await this.agricultorSeeder.seed();
    await this.culturaSeeder.seed();
    await this.fazendaSeeder.seed();
    await this.safraSeeder.seed();
  }
}
