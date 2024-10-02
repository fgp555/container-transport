import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PackageEntity } from 'src/modules/package/entity-dtos/package.entity';

@Entity()
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ name: 'issuing-company' })
  issuingCompany: string;

  @Column({ name: 'receiving-company' })
  receivingCompany: string;

  @OneToMany(() => PackageEntity, (pkg) => pkg.client)
  packages: PackageEntity[];
}
