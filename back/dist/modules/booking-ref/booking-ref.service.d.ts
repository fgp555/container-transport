import { Repository } from 'typeorm';
import { BookingRefEntity } from './entity-dtos/booking-ref.entity';
export declare class BookingRefService {
    private bookingRefRepository;
    constructor(bookingRefRepository: Repository<BookingRefEntity>);
    findAll(): Promise<BookingRefEntity[]>;
    findOne(id: number): Promise<BookingRefEntity>;
    create(bookingRef: BookingRefEntity): Promise<BookingRefEntity>;
    update(id: number, bookingRef: BookingRefEntity): Promise<BookingRefEntity>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
