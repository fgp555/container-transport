import { ContainerEntity } from 'src/modules/container/entity-dtos/container.entity';
export declare class BookingRefEntity {
    id: number;
    number: string;
    shipmentDate: Date;
    receiptDate: Date;
    from: string;
    to: string;
    containers: ContainerEntity[];
}
