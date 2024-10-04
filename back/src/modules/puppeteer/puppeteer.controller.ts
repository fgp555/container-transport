import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import { PuppeteerService } from './puppeteer.service';
import { FinalReportService } from '../final-report/final-report.service'; // Asegúrate de ajustar la ruta según tu estructura

@Controller('puppeteer')
export class PuppeteerController {
  constructor(
    private readonly pdfService: PuppeteerService,
    private readonly finalReportService: FinalReportService, // Inyección del servicio
  ) {}

  @Get('/imagesDataById/:id')
  async generatePdf(@Res() res: Response, @Param('id') id: number) {
    console.log("id", id);
    // const imagesData = await this.getImagesData(); // Obtener datos de las imágenes desde la base de datos
    const imagesDataById = await this.getImagesDataById(id); // Obtener datos de las imágenes desde la base de datos por id
    // console.log("imagesData", imagesData);
    console.log("imagesDataById", imagesDataById);

    if(!imagesDataById) {
      throw new Error('No se encontraron imágenes');
    }
    
    // Generar el HTML dinámicamente para las imágenes
    const imagesHtml = imagesDataById.map(image => `<img src="data:image/png;base64,${this.getBase64Image('../' + image.path)}" />`).join('');


    const htmlContent = /* html */ `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            font-size: 16px;
            line-height: 24px;
            color: #555;
          }
          .images {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          .images img {
            width: 30%;
            height: auto;
            border: 1px solid #ddd;
          }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <!-- Aquí puedes incluir el resto de tu contenido HTML -->
          <div class="images images_container">
            ${imagesHtml} <!-- Incluir imágenes dinámicamente -->
          </div>
          <!-- Continúa con el resto del contenido -->
        </div>
      </body>
      </html>
    `;

    const pdfBuffer = await this.pdfService.generatePdf(htmlContent);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="invoice.pdf"',
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }

  // Método para convertir una imagen a base64
  private getBase64Image(imagePath: string): string {
    const logoPath = path.resolve(__dirname, '..', '..', imagePath);
    const logo = fs.readFileSync(logoPath);
    return logo.toString('base64');
  }

  // Método para obtener las imágenes desde la base de datos
  private async getImagesData() {
    const reports = await this.finalReportService.findAll(); // Ajusta según tu implementación
    return reports.flatMap(report => report.images); // Asegúrate de que la relación esté bien configurada
  }

  // Método para obtener las imágenes desde la base de datos por id
  private async getImagesDataById(id: number) {
    const report = await this.finalReportService.findOne(id); // Ajusta aquí tu implementación
    if (!report) {
      throw new Error('Report not found');
    }
    return report.images; // Asegúrate de que la aplicación esté bien configurada
  }
}
