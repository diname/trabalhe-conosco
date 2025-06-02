import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('culturas')
export class CulturaOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  nome: string;
}
