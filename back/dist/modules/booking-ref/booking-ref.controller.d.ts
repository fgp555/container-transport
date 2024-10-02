import { BookingRefService } from './booking-ref.service';
import { BookingRefEntity } from './entity-dtos/booking-ref.entity';
export declare class BookingRefController {
    private readonly bookingRefService;
    constructor(bookingRefService: BookingRefService);
    findAll(): Promise<BookingRefEntity[]>;
    findOne(id: number): Promise<BookingRefEntity>;
    create(bookingRef: BookingRefEntity): Promise<BookingRefEntity>;
    update(id: number, bookingRef: BookingRefEntity): Promise<BookingRefEntity>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
