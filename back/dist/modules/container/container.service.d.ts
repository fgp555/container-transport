import { Repository } from 'typeorm';
import { ContainerEntity } from './entity-dtos/container.entity';
export declare class ContainerService {
    private containerRepository;
    constructor(containerRepository: Repository<ContainerEntity>);
    findAll(): Promise<ContainerEntity[]>;
    findOne(id: number): Promise<ContainerEntity>;
    create(container: ContainerEntity): Promise<ContainerEntity>;
    update(id: number, container: ContainerEntity): Promise<ContainerEntity>;
    remove(id: number): Promise<void>;
}
