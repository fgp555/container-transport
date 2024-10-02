import { BookingRefEntity } from 'src/modules/booking-ref/entity-dtos/booking-ref.entity';
export declare class ContainerEntity {
    id: number;
    containerNo: string;
    bookingRef: BookingRefEntity;
    openingDate: Date;
    closingDate: Date;
}
