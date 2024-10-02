import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './entity-dtos/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {}

  findAll(): Promise<AdminEntity[]> {
    return this.adminRepository.find();
  }

  findOne(id: number): Promise<AdminEntity> {
    return this.adminRepository.findOneBy({ id });
  }

  create(admin: AdminEntity): Promise<AdminEntity> {
    return this.adminRepository.save(admin);
  }

  async update(id: number, admin: AdminEntity): Promise<AdminEntity> {
    await this.adminRepository.update(id, admin);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.adminRepository.delete(id);
  }
}
