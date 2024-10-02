import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinalReportEntity } from './entity-dtos/final-report.entity';

@Injectable()
export class FinalReportService {
  constructor(
    @InjectRepository(FinalReportEntity)
    private finalReportRepository: Repository<FinalReportEntity>,
  ) {}

  findAll(): Promise<FinalReportEntity[]> {
    return this.finalReportRepository.find({ relations: ['images'] }); // Cargar imágenes
  }

  findOne(id: number): Promise<FinalReportEntity> {
    return this.finalReportRepository.findOne({ where: { id }, relations: ['images'] }); // Cargar imágenes
  }

  create(finalReport: FinalReportEntity): Promise<FinalReportEntity> {
    return this.finalReportRepository.save(finalReport);
  }

  async update(id: number, finalReport: FinalReportEntity): Promise<FinalReportEntity> {
    await this.finalReportRepository.update(id, finalReport);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.finalReportRepository.delete(id);
  }
}
