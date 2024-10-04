// back/src/modules/image/image.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from './entity-dtos/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
  ) {}

  findAll(): Promise<ImageEntity[]> {
    return this.imageRepository.find();
  }

  findOne(id: number): Promise<ImageEntity> {
    return this.imageRepository.findOneBy({ id });
  }

  create(image: ImageEntity): Promise<ImageEntity> {
    return this.imageRepository.save(image);
  }

  async update(id: number, image: ImageEntity): Promise<ImageEntity> {
    await this.imageRepository.update(id, image);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.imageRepository.delete(id);
  }
}
