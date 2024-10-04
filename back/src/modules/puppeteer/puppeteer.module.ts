import { Module } from '@nestjs/common';
import { PuppeteerController } from './puppeteer.controller';
import { PuppeteerService } from './puppeteer.service';
import { ImageService } from '../image/image.service';
import { ImageEntity } from '../image/entity-dtos/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinalReportService } from '../final-report/final-report.service';
import { FinalReportEntity } from '../final-report/entity-dtos/final-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity, FinalReportEntity])],
  controllers: [PuppeteerController],
  providers: [PuppeteerService, ImageService, FinalReportService],
})
export class PuppeteerModule {}
