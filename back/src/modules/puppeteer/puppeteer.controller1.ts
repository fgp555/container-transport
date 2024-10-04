// back/src/modules/puppeteer/puppeteer.controller.ts

import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PuppeteerService } from './puppeteer.service';
import { join } from 'path';
import * as fs from 'fs';
import * as path from 'path';

@Controller('puppeteer')
export class PuppeteerController {
  constructor(private readonly pdfService: PuppeteerService) {}

  @Get()
  async generatePdf(@Res() res: Response) {
    // Leer la plantilla HTML
    const templatePath = join(
      __dirname,
      '..',
      '..',
      '..',
      'template',
      'template.html',
    );
    let htmlContent = fs.readFileSync(templatePath, 'utf8');

    // Obtener los datos de la base de datos
    // const data = await this.dataService.getData();
    const tempData = [
      {
        id: 1,
        path: 'uploads/favicon.jpg',
      },
      {
        id: 2,
        path: 'uploads/favicon.jpg',
      },
    ];

    // Reemplazar los marcadores de posición con contenido dinámico
    const logoBase64 = this.getBase64Logo('../../../uploads/favicon.png');
    const image1Base64 = this.getBase64Logo('../../../uploads/favicon.png');
    const image2Base64 = this.getBase64Logo('../../../uploads/favicon.png');
    const image3Base64 = this.getBase64Logo('../../../uploads/favicon.png');

    htmlContent = htmlContent
      .replace('{{logo}}', `data:image/png;base64,${logoBase64}`)
      .replace('{{image1}}', `data:image/png;base64,${image1Base64}`)
      .replace('{{image2}}', `data:image/png;base64,${image2Base64}`)
      .replace('{{image3}}', `data:image/png;base64,${image3Base64}`);

    // Generar PDF
    const pdfBuffer = await this.pdfService.generatePdf(htmlContent);

    // Establecer encabezados y enviar el PDF como respuesta
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="invoice.pdf"',
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }

  // Método para convertir el logo a base64
  private getBase64Logo(pathString: string): string {
    const logoPath = path.resolve(__dirname, pathString);
    const logo = fs.readFileSync(logoPath);
    return logo.toString('base64');
  }
}
