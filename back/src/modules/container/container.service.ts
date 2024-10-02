import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContainerEntity } from './entity-dtos/container.entity';

@Injectable()
export class ContainerService {
  constructor(
    @InjectRepository(ContainerEntity)
    private containerRepository: Repository<ContainerEntity>,
  ) {}

  findAll(): Promise<ContainerEntity[]> {
    return this.containerRepository.find();
  }

  findOne(id: number): Promise<ContainerEntity> {
    return this.containerRepository.findOneBy({ id });
  }

  create(container: ContainerEntity): Promise<ContainerEntity> {
    return this.containerRepository.save(container);
  }

  async update(id: number, container: ContainerEntity): Promise<ContainerEntity> {
    await this.containerRepository.update(id, container);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.containerRepository.delete(id);
  }
}
