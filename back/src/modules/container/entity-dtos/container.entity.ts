import { BookingRefEntity } from 'src/modules/booking-ref/entity-dtos/booking-ref.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { BookingRef } from '../booking-ref/booking-ref.entity';

@Entity()
export class ContainerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'container-no' })
  containerNo: string;

  @ManyToOne(() => BookingRefEntity, (bookingRef) => bookingRef.containers)
  bookingRef: BookingRefEntity;

  @Column({ name: 'opening-date' })
  openingDate: Date;

  @Column({ name: 'closing-date' })
  closingDate: Date;
}
