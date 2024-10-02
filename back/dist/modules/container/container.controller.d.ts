import { ContainerService } from './container.service';
import { ContainerEntity } from './entity-dtos/container.entity';
export declare class ContainerController {
    private readonly containerService;
    constructor(containerService: ContainerService);
    findAll(): Promise<ContainerEntity[]>;
    findOne(id: number): Promise<ContainerEntity>;
    create(container: ContainerEntity): Promise<ContainerEntity>;
    update(id: number, container: ContainerEntity): Promise<ContainerEntity>;
    remove(id: number): Promise<void>;
}
