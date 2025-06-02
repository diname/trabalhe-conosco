import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('safras')
export class SafraOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  ano: number;

  @Column()
  fazendaId: string;

  @Column('simple-array')
  culturasIds: string[];
}
