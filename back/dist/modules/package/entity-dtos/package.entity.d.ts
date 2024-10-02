import { ClientEntity } from 'src/modules/client/entity-dtos/client.entity';
export declare class PackageEntity {
    id: number;
    description: string;
    cantidad: number;
    client: ClientEntity;
}
