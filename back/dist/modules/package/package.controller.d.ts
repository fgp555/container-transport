import { PackageService } from './package.service';
import { PackageEntity } from './entity-dtos/package.entity';
export declare class PackageController {
    private readonly packageService;
    constructor(packageService: PackageService);
    findAll(): Promise<PackageEntity[]>;
    findOne(id: number): Promise<PackageEntity>;
    create(packageEntity: PackageEntity): Promise<PackageEntity>;
    update(id: number, packageEntity: PackageEntity): Promise<PackageEntity>;
    remove(id: number): Promise<void>;
}
