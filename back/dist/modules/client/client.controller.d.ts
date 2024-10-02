import { ClientService } from './client.service';
import { ClientEntity } from './entity-dtos/client.entity';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    findAll(): Promise<ClientEntity[]>;
    findOne(id: number): Promise<ClientEntity>;
    create(client: ClientEntity): Promise<ClientEntity>;
    update(id: number, client: ClientEntity): Promise<ClientEntity>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
