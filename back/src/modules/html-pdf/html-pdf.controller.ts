import { Body, Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { HtmlPdfService } from './html-pdf.service';
import { FinalReportService } from '../final-report/final-report.service'; // Asegúrate de ajustar la ruta según tu estructura
import * as fs from 'fs';

@Controller('html-pdf')
export class HtmlPdfController {
  constructor(
    private readonly pdfService: HtmlPdfService,
    private readonly finalReportService: FinalReportService, // Inyección del servicio
  ) {}

  @Get()
  async createPdf(@Body() data: any, @Res() res: Response) {
    try {
      const pdfBuffer = await this.pdfService.generatePdf(data);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="document.pdf"',
        'Content-Length': pdfBuffer.length,
      });

      res.end(pdfBuffer); // Enviar el PDF como respuesta
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      res.status(500).send('Error al generar el PDF');
    }
  }

  @Get('/final-report/:id')
  async generatePdf(@Res() res: Response, @Param('id') id: number) {
    console.log('id', id);

    const imagesDataById = await this.getImagesDataById(id); // Obtener datos de las imágenes desde la base de datos por id
    console.log('imagesDataById', imagesDataById);

    if (!imagesDataById) {
      throw new Error('No se encontraron imágenes');
    }

    // Generar el HTML dinámicamente para las imágenes
    const imagesHtml = imagesDataById
      .map(
        (image) =>
          `<img src="data:image/png;base64,${this.getBase64Image(image.path)}" />`,
      )
      .join('');

    const htmlContent = /* html */ `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            font-size: 16px;
          }
          .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            font-size: 16px;
            line-height: 24px;
            color: #555;
          }
          .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
          }
          .invoice-box table td {
            padding: 5px;
            vertical-align: top;
          }
          .invoice-box table tr td:nth-child(2) {
            text-align: right;
          }
          .invoice-box table tr.top table td {
            padding-bottom: 20px;
          }
          .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
          }
          .invoice-box table tr.information table td {
            padding-bottom: 40px;
          }
          .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
          }
          .invoice-box table tr.details td {
            padding-bottom: 20px;
          }
          .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
          }
          .invoice-box table tr.item.last td {
            border-bottom: none;
          }
          .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
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
          <table cellpadding="0" cellspacing="0">
            <tr class="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td class="title">
                      <h1>Factura</h1>
                    </td>
                    <td>
                      Número de Factura: #123<br />
                      Fecha de emisión: 1 de Octubre, 2024<br />
                      Fecha de vencimiento: 15 de Octubre, 2024
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
    
            <tr class="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      Empresa XYZ, Inc.<br />
                      123 Calle Empresa<br />
                      Ciudad, CP 12345
                    </td>
                    <td>
                      Cliente: Juan Pérez<br />
                      Dirección del Cliente<br />
                      Ciudad, CP 67890
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
    
            <tr class="heading">
              <td>Descripción</td>
              <td>Precio</td>
            </tr>
    
            <tr class="item">
              <td>Producto/Servicio 1</td>
              <td>$300.00</td>
            </tr>
    
            <tr class="item">
              <td>Producto/Servicio 2</td>
              <td>$150.00</td>
            </tr>
    
            <tr class="item last">
              <td>Producto/Servicio 3</td>
              <td>$50.00</td>
            </tr>
    
            <tr class="total">
              <td></td>
              <td>Total: $500.00</td>
            </tr>
          </table>
    
          <div class="images images_container">
            ${imagesHtml} <!-- Incluir imágenes dinámicamente -->
          </div>
        </div>
      </body>
      </html>
    `;

    const pdfBuffer = await this.pdfService.generatePdf({
      content: htmlContent,
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="invoice.pdf"',
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }

  // Método para convertir una imagen a base64
  private getBase64Image(imagePath: string): string {
    const image = fs.readFileSync(
      path.resolve(__dirname, '..', '..', '..', imagePath),
    );
    return Buffer.from(image).toString('base64');
  }

  // Método para obtener las imágenes desde la base de datos por id
  private async getImagesDataById(id: number) {
    const report = await this.finalReportService.findOne(id); // Ajusta según tu implementación
    if (!report) {
      throw new Error('Report not found');
    }
    return report.images; // Asegúrate de que la relación esté bien configurada
  }
}
