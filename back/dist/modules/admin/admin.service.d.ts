import { Repository } from 'typeorm';
import { AdminEntity } from './entity-dtos/admin.entity';
export declare class AdminService {
    private adminRepository;
    constructor(adminRepository: Repository<AdminEntity>);
    findAll(): Promise<AdminEntity[]>;
    findOne(id: number): Promise<AdminEntity>;
    create(admin: AdminEntity): Promise<AdminEntity>;
    update(id: number, admin: AdminEntity): Promise<AdminEntity>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
