import { Repository } from 'typeorm';
import { ClientEntity } from './entity-dtos/client.entity';
export declare class ClientService {
    private clientRepository;
    constructor(clientRepository: Repository<ClientEntity>);
    findAll(): Promise<ClientEntity[]>;
    findOne(id: number): Promise<ClientEntity>;
    create(client: ClientEntity): Promise<ClientEntity>;
    update(id: number, client: ClientEntity): Promise<ClientEntity>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
