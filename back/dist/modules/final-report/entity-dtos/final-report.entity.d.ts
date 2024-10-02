import { ImageEntity } from 'src/modules/image/entity-dtos/image.entity';
export declare class FinalReportEntity {
    id: number;
    bLNo: string;
    consignee: string;
    marks: string;
    qtyPkgs: number;
    remarks: string;
    pallet: string;
    legend: string;
    images: ImageEntity[];
}
