import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('fazendas')
export class FazendaOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  nome: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column({ type: 'float' })
  areaTotal: number;

  @Column({ type: 'float' })
  areaAgricultavel: number;

  @Column({ type: 'float' })
  areaVegetacao: number;

  @Column()
  agricultorId: string;
}
