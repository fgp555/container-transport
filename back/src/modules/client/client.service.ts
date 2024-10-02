import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './entity-dtos/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  findAll(): Promise<ClientEntity[]> {
    return this.clientRepository.find();
  }

  findOne(id: number): Promise<ClientEntity> {
    return this.clientRepository.findOneBy({ id });
  }

  create(client: ClientEntity): Promise<ClientEntity> {
    return this.clientRepository.save(client);
  }

  async update(id: number, client: ClientEntity): Promise<ClientEntity> {
    await this.clientRepository.update(id, client);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.clientRepository.delete(id);
  }
}
