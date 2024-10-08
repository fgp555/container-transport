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
    // Obtener datos de las imágenes desde la base de datos por id
    const finalReportById = await this.finalReportServiceFindOne(id);
    console.log('finalReportById', finalReportById);
    /* 
    {
  id: 1,
  bLNo: 'BUE238550',
  consignee: 'BIO ABA SA',
  marks: '29119880',
  qtyPkgs: 2,
  remarks: '1 pallet: shrink-wrap film stretch torn off + torn paper bags',
  pallet: 'shrink-wrap film stretch torn off + torn paper bags',
  legend: 'I. Due to the poorly and/or improperly stuffed, the cargo required an extra handling. II. The load was un-palletized in order to safely handled and/or avoid damage to the cargo.',
  images: [
    ImageEntity { id: 1, path: 'uploads/favicon.png' },
    ImageEntity { id: 2, path: 'uploads/favicon.png' }
  ]
}
     */

    if (!finalReportById) {
      throw new Error('No se encontraron imágenes');
    }

    // Generar el HTML dinámicamente para las imágenes
    const imagesHtml = finalReportById.images
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
          }
          .report-box {
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
          .report-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
          }
          .report-box table td {
            padding: 5px;
            vertical-align: top;
          }
          .report-box table tr td:nth-child(2) {
            text-align: right;
          }
          .report-box table tr.top table td {
            padding-bottom: 20px;
          }
          .report-box table tr.top table td.title {
            font-size: 30px;
            line-height: 45px;
            color: #333;
          }
          .report-box table tr.information table td {
            padding-bottom: 40px;
          }
          .report-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
          }
          .report-box table tr.details td {
            padding-bottom: 20px;
          }
          .report-box table tr.item td {
            border-bottom: 1px solid #eee;
          }
          .report-box table tr.item.last td {
            border-bottom: none;
          }
          .report-box table tr.total td:nth-child(2) {
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
        <div class="report-box">
          <table cellpadding="0" cellspacing="0">
            <tr class="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td class="title">
                      <img src="data:image/png;base64,${this.getBase64Image('uploads/favicon.png')}" style="width:100%; max-width:100px;">
                    </td>
                    <td>
                      FLAVIO A. PREZIOSA<br />
                      Habana 2874 - 1419 - Buenos Aires - Argentina<br />
                      M: +54 911 6677 2741<br />
                      E: flaviopreziosa@gmail.com
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
    
            <tr class="heading">
              <td colspan="2">
                Detalles del Informe de Recepción de Paquete
              </td>
            </tr>
    
            <tr class="item">
              <td>id:</td>
              <td>${finalReportById.id}</td>
            </tr>
    
            <tr class="item">
              <td>B/L No:</td>
              <td>${finalReportById.bLNo}</td>
            </tr>
    
            <tr class="item">
              <td>Consignee:</td>
              <td>${finalReportById.consignee}</td>
            </tr>
    
            <tr class="item">
              <td>Marks:</td>
              <td>${finalReportById.marks}</td>
            </tr>
    
            <tr class="item">
              <td>Qty. of pkgs.:</td>
              <td>${finalReportById.qtyPkgs}</td>
            </tr>
    
            <tr class="item">
              <td>Remarks:</td>
              <td>${finalReportById.remarks}</td>
            </tr>
    
            <tr class="item">
              <td>Pallet:</td>
              <td>${finalReportById.pallet}</td>
            </tr>
    
            <tr class="heading">
              <td colspan="2">
                Leyenda:
              </td>
            </tr>
    
            <tr class="item last">
              <td colspan="2">
                <!-- I. Debido a que la carga fue mal y/o incorrectamente embalada, se requirió un manejo adicional.<br /> -->
                <!-- II. La carga fue despaletizada para manejarla de manera segura y/o evitar daños a la carga. -->
                ${finalReportById.legend}
              </td>
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
  private async finalReportServiceFindOne(id: number) {
    const report = await this.finalReportService.findOne(id); // Ajusta según tu implementación
    if (!report) {
      throw new Error('Report not found');
    }
    return report; // Asegúrate de que la relación esté bien configurada
  }
}
