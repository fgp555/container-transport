import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackageEntity } from './entity-dtos/package.entity';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(PackageEntity)
    private packageRepository: Repository<PackageEntity>,
  ) {}

  findAll(): Promise<PackageEntity[]> {
    return this.packageRepository.find();
  }

  findOne(id: number): Promise<PackageEntity> {
    return this.packageRepository.findOneBy({ id });
  }

  create(packageEntity: PackageEntity): Promise<PackageEntity> {
    return this.packageRepository.save(packageEntity);
  }

  async update(id: number, packageEntity: PackageEntity): Promise<PackageEntity> {
    await this.packageRepository.update(id, packageEntity);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.packageRepository.delete(id);
  }
}
