import { PackageEntity } from 'src/modules/package/entity-dtos/package.entity';
export declare class ClientEntity {
    id: number;
    name: string;
    email: string;
    phone: string;
    issuingCompany: string;
    receivingCompany: string;
    packages: PackageEntity[];
}
