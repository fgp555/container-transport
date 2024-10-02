import { ContainerEntity } from 'src/modules/container/entity-dtos/container.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Container } from '../container/container.entity';

@Entity()
export class BookingRefEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column({ name: 'f-envio' })
  envioDate: Date;

  @Column({ name: 'f-recepcion' })
  recepcionDate: Date;

  @Column({ name: 'date-shipment' })
  shipmentDate: Date;

  @Column({ name: 'date-receipt' })
  receiptDate: Date;

  @Column()
  from: string;

  @Column()
  to: string;

  @OneToMany(() => ContainerEntity, (container) => container.bookingRef)
  containers: ContainerEntity[];
}
