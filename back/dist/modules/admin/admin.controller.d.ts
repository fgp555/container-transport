import { AdminService } from './admin.service';
import { AdminEntity } from './entity-dtos/admin.entity';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    findAll(): Promise<AdminEntity[]>;
    findOne(id: number): Promise<AdminEntity>;
    create(admin: AdminEntity): Promise<AdminEntity>;
    update(id: number, admin: AdminEntity): Promise<AdminEntity>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
