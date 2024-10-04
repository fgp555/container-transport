// back/src/modules/final-report/final-report.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinalReportEntity } from './entity-dtos/final-report.entity';
import { ImageEntity } from 'src/modules/image/entity-dtos/image.entity';

@Injectable()
export class FinalReportService {
  constructor(
    @InjectRepository(FinalReportEntity)
    private finalReportRepository: Repository<FinalReportEntity>,

    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
  ) {}

  findAll(): Promise<FinalReportEntity[]> {
    return this.finalReportRepository.find({ relations: ['images'] });
  }

  findOne(id: number): Promise<FinalReportEntity> {
    return this.finalReportRepository.findOne({
      where: { id },
      relations: ['images'],
    });
  }

  async create(
    finalReport: FinalReportEntity,
    images: Express.Multer.File[],
  ): Promise<FinalReportEntity> {
    // Procesar y guardar las imágenes
    const savedImages = await this.saveImages(images);

    finalReport.images = savedImages;
    return this.finalReportRepository.save(finalReport);
  }

  async update(
    id: number,
    finalReport: FinalReportEntity,
    images: Express.Multer.File[],
  ): Promise<FinalReportEntity> {
    const existingReport = await this.finalReportRepository.findOne({
      where: { id },
      relations: ['images'],
    });

    if (!existingReport) {
      throw new Error('FinalReport not found');
    }

    if (images && images.length > 0) {
      // Eliminar las imágenes antiguas
      await this.imageRepository.delete({ finalReport: existingReport });

      // Guardar las nuevas imágenes
      const savedImages = await this.saveImages(images);
      finalReport.images = savedImages;
    } else {
      finalReport.images = existingReport.images; // Mantener las imágenes antiguas si no se suben nuevas
    }

    await this.finalReportRepository.update(id, finalReport);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.finalReportRepository.delete(id);
  }

  // Helper para guardar imágenes
  private async saveImages(
    files: Express.Multer.File[],
  ): Promise<ImageEntity[]> {
    const imageEntities: ImageEntity[] = files.map((file) => {
      const image = new ImageEntity();
      image.path = file.path; // Guardar la ruta del archivo subido
      return image;
    });
    return this.imageRepository.save(imageEntities);
  }
}
