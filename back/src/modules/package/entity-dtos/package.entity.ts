import { ClientEntity } from 'src/modules/client/entity-dtos/client.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { Client } from '../client/client.entity';

@Entity()
export class PackageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  cantidad: number;

  @ManyToOne(() => ClientEntity, (client) => client.packages)
  client: ClientEntity;
}
