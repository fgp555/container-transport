import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingRefEntity } from './entity-dtos/booking-ref.entity';

@Injectable()
export class BookingRefService {
  constructor(
    @InjectRepository(BookingRefEntity)
    private bookingRefRepository: Repository<BookingRefEntity>,
  ) {}

  findAll(): Promise<BookingRefEntity[]> {
    return this.bookingRefRepository.find();
  }

  findOne(id: number): Promise<BookingRefEntity> {
    return this.bookingRefRepository.findOneBy({ id });
  }

  create(bookingRef: BookingRefEntity): Promise<BookingRefEntity> {
    return this.bookingRefRepository.save(bookingRef);
  }

  async update(id: number, bookingRef: BookingRefEntity): Promise<BookingRefEntity> {
    await this.bookingRefRepository.update(id, bookingRef);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.bookingRefRepository.delete(id);
  }
}
