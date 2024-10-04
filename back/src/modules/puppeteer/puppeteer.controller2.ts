import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PuppeteerService } from './puppeteer.service';
import { ImageService } from '../image/image.service';
import * as fs from 'fs';
import { join } from 'path';

@Controller('puppeteer')
export class PuppeteerController {
  constructor(
    private readonly pdfService: PuppeteerService,
    private readonly imageService: ImageService,
  ) {}

  @Get()
  async generatePdf(@Res() res: Response) {
    // Cargar la plantilla HTML
    const templatePath = join(
      __dirname,
      '..',
      '..',
      '..',
      'template',
      'template.html',
    );
    let htmlContent = fs.readFileSync(templatePath, 'utf8');

    // Obtener imágenes de la base de datos
    const images = await this.imageService.findAll();
    console.log('images', images);
    console.log('images[0].path', '../../' + images[0].path);

    // Verificar que se tengan al menos 3 imágenes
    if (images.length >= 3) {
    const image1Base64 = this.getBase64FromPath(images[0].path);
    const image2Base64 = this.getBase64FromPath(images[1].path);
    const image3Base64 = this.getBase64FromPath(images[2].path);

    // Reemplazar los marcadores de posición con las imágenes de la base de datos
    htmlContent = htmlContent
      .replace('{{image1}}', `data:image/png;base64,${image1Base64}`)
      .replace('{{image2}}', `data:image/png;base64,${image2Base64}`)
      .replace('{{image3}}', `data:image/png;base64,${image3Base64}`);
    } else {
      // Si no hay suficientes imágenes en la base de datos, usa un placeholder o imágenes por defecto
      htmlContent = htmlContent
        .replace('{{image1}}', '')
        .replace('{{image2}}', '')
        .replace('{{image3}}', '');
    }

    // Mantener el logo sin modificaciones
    const logoBase64 = this.getBase64Logo('uploads/favicon.png');
    htmlContent = htmlContent.replace(
      '{{logo}}',
      `data:image/png;base64,${logoBase64}`,
    );

    // Generar el PDF usando Puppeteer
    const pdfBuffer = await this.pdfService.generatePdf(htmlContent);

    // Configurar y enviar el PDF como respuesta
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="invoice.pdf"',
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }

  // Método para convertir imágenes a Base64
  private getBase64FromPath(filePath: string): string {
    const fullPath = join(__dirname, '..', '..', '..', filePath);
    const file = fs.readFileSync(fullPath);
    return file.toString('base64');
  }

  // Método para obtener el logo en Base64
  private getBase64Logo(pathString: string): string {
    const logoPath = join(__dirname, '..', '..', '..', pathString);
    const logo = fs.readFileSync(logoPath);
    return logo.toString('base64');
  }
}
