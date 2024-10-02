import { Repository } from 'typeorm';
import { PackageEntity } from './entity-dtos/package.entity';
export declare class PackageService {
    private packageRepository;
    constructor(packageRepository: Repository<PackageEntity>);
    findAll(): Promise<PackageEntity[]>;
    findOne(id: number): Promise<PackageEntity>;
    create(packageEntity: PackageEntity): Promise<PackageEntity>;
    update(id: number, packageEntity: PackageEntity): Promise<PackageEntity>;
    remove(id: number): Promise<void>;
}
