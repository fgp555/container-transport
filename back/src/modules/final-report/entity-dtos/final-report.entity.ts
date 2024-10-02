import { ImageEntity } from 'src/modules/image/entity-dtos/image.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class FinalReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'b-l-no' })
  bLNo: string;

  @Column()
  consignee: string;

  @Column({ name: 'marks' })
  marks: string;

  @Column({ name: 'qty-pkgs' })
  qtyPkgs: number;

  @Column()
  remarks: string;

  @Column()
  pallet: string;

  @Column({ name: 'legend' })
  legend: string;

  @ManyToMany(() => ImageEntity)
  @JoinTable()
  images: ImageEntity[];
}
