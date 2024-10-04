// back/src/modules/final-report/final-report.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FinalReportService } from './final-report.service';
import { FinalReportEntity } from './entity-dtos/final-report.entity';
import { FilesInterceptor } from '@nestjs/platform-express'; // Importar el interceptor para manejar múltiples archivos
import { diskStorage } from 'multer'; // Multer para configurar dónde y cómo se guardan los archivos
import * as fs from 'fs-extra';

@Controller('final-report')
export class FinalReportController {
  constructor(private readonly finalReportService: FinalReportService) {}

  @Get()
  findAll() {
    return this.finalReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.finalReportService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      // Permitimos hasta 10 archivos
      storage: diskStorage({
        // destination: './uploads/images', // Directorio donde se guardan las imágenes
        destination: async (req, file, callback) => {
          const uploadPath = './uploads/images';
          await fs.ensureDir(uploadPath); // Crea el directorio si no existe
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = file.originalname.split('.').pop();
          const filename = `${file.fieldname}-${uniqueSuffix}.${fileExt}`;
          callback(null, filename);
        },
      }),
    }),
  )
  create(
    @Body() finalReport: FinalReportEntity,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.finalReportService.create(finalReport, images);
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        // destination: './uploads/images',
        destination: async (req, file, callback) => {
          const uploadPath = './uploads/images';
          await fs.ensureDir(uploadPath); // Crea el directorio si no existe
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = file.originalname.split('.').pop();
          const filename = `${file.fieldname}-${uniqueSuffix}.${fileExt}`;
          callback(null, filename);
        },
      }),
    }),
  )
  update(
    @Param('id') id: number,
    @Body() finalReport: FinalReportEntity,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.finalReportService.update(id, finalReport, images);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.finalReportService.remove(id);
  }
}
