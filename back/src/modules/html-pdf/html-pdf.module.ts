import { Module } from '@nestjs/common';
import { HtmlPdfController } from './html-pdf.controller';
import { HtmlPdfService } from './html-pdf.service';
import { FinalReportService } from '../final-report/final-report.service';
import { ImageService } from '../image/image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from '../image/entity-dtos/image.entity';
import { FinalReportEntity } from '../final-report/entity-dtos/final-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity, FinalReportEntity])],
  controllers: [HtmlPdfController],
  providers: [HtmlPdfService, FinalReportService, ImageService],
  exports: [],
})
export class HtmlPdfModule {}
