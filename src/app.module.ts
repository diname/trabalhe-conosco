import { AtualizarAgricultorUseCase } from '@Application/use-cases/agricultor/atualiza-agricultor.use-case';
import { BuscarTodosAgricultoresUseCase } from '@Application/use-cases/agricultor/busca-agricultor.use-case';
import { CriarAgricultorUseCase } from '@Application/use-cases/agricultor/cria-agricultor.use-case';
import { RemoverAgricultorUseCase } from '@Application/use-cases/agricultor/deleta-agricultor.use-case';
import { AtualizarCulturaUseCase } from '@Application/use-cases/cultura/atualiza-cultura.use-case';
import { BuscarTodasCulturasUseCase } from '@Application/use-cases/cultura/busca-cultura.use-case';
import { CriarCulturaUseCase } from '@Application/use-cases/cultura/cria-cultura.use-case';
import { RemoverCulturaUseCase } from '@Application/use-cases/cultura/deleta-cultura.use-case';
import { AtualizarFazendaUseCase } from '@Application/use-cases/fazenda/atualiza-fazenda.use-case';
import { BuscarTodasFazendasUseCase } from '@Application/use-cases/fazenda/busca-fazenda.use-case';
import { CriarFazendaUseCase } from '@Application/use-cases/fazenda/cria-fazenda.use-case';
import { RemoverFazendaUseCase } from '@Application/use-cases/fazenda/deleta-fazenda.use-case';
import { AtualizarSafraUseCase } from '@Application/use-cases/safra/atualiza-safra.use-case';
import { BuscarTodasSafrasUseCase } from '@Application/use-cases/safra/busca-safra.use-case';
import { CriarSafraUseCase } from '@Application/use-cases/safra/cria-safra.use-case';
import { RemoverSafraUseCase } from '@Application/use-cases/safra/deleta-safra.use-case';
import { AgricultorRepositoryImplt } from '@Infrastructure/repositories/agricultor.repository.implt';
import { CulturaRepositoryImplt } from '@Infrastructure/repositories/cultura.repository.implt';
import { FazendaRepositoryImplt } from '@Infrastructure/repositories/fazenda.repository.implt';
import { SafraRepositoryImplt } from '@Infrastructure/repositories/safra.repository.implt';
import { PostgresConfigService } from '@Infrastructure/typeorm/config/postgres.config.service';
import { AgricultorOrmEntity } from '@Infrastructure/typeorm/models/agricultor.model';
import { CulturaOrmEntity } from '@Infrastructure/typeorm/models/cultura.model';
import { FazendaOrmEntity } from '@Infrastructure/typeorm/models/fazenda.model';
import { SafraOrmEntity } from '@Infrastructure/typeorm/models/safra.model';
import { AgricultorSeeder } from '@Infrastructure/typeorm/seed/agricultor.seeder';
import { CulturaSeeder } from '@Infrastructure/typeorm/seed/cultura.seeder';
import { FazendaSeeder } from '@Infrastructure/typeorm/seed/fazenda.seeder';
import { SafraSeeder } from '@Infrastructure/typeorm/seed/safra.seeder';
import { SeederProvider } from '@Infrastructure/typeorm/seed/seeder.provider';
import { EnvironmentVariableModule } from '@Shared/config/environment-variable/environment-variable.module';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgricultorController } from './presentation/controllers/agricultor.controller';
import { CulturaController } from './presentation/controllers/cultura.controller';
import { FazendaController } from './presentation/controllers/fazenda.controller';
import { SafraController } from './presentation/controllers/safra.controller';

@Module({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    TypeOrmModule.forFeature([
      AgricultorOrmEntity,
      FazendaOrmEntity,
      CulturaOrmEntity,
      SafraOrmEntity,
    ]),

    EnvironmentVariableModule.forRoot({ isGlobal: true }),
    TerminusModule,
  ],
  controllers: [
    AgricultorController,
    FazendaController,
    CulturaController,
    SafraController,
  ],
  providers: [
    AgricultorSeeder,
    CulturaSeeder,
    FazendaSeeder,
    SafraSeeder,
    SeederProvider,
    AgricultorRepositoryImplt,
    FazendaRepositoryImplt,
    CulturaRepositoryImplt,
    SafraRepositoryImplt,
    CriarAgricultorUseCase,
    AtualizarAgricultorUseCase,
    RemoverAgricultorUseCase,
    BuscarTodosAgricultoresUseCase,
    CriarFazendaUseCase,
    AtualizarFazendaUseCase,
    RemoverFazendaUseCase,
    BuscarTodasFazendasUseCase,
    CriarCulturaUseCase,
    AtualizarCulturaUseCase,
    RemoverCulturaUseCase,
    BuscarTodasCulturasUseCase,
    CriarSafraUseCase,
    AtualizarSafraUseCase,
    RemoverSafraUseCase,
    BuscarTodasSafrasUseCase,
    {
      provide: 'AgricultorRepository',
      useClass: AgricultorRepositoryImplt,
    },
    {
      provide: 'FazendaRepository',
      useClass: FazendaRepositoryImplt,
    },
    {
      provide: 'CulturaRepository',
      useClass: CulturaRepositoryImplt,
    },
    {
      provide: 'SafraRepository',
      useClass: SafraRepositoryImplt,
    },
  ],
})
export class AppModule {}
