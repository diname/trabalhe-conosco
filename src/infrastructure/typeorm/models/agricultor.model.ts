import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('agricultores')
export class AgricultorOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  documento: string;

  @Column()
  nome: string;
}
