import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
// import { PdfService } from './puppeteer.service';
import { join } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import { PuppeteerService } from './puppeteer.service';

@Controller('puppeteer')
export class PuppeteerController {
  constructor(private readonly pdfService: PuppeteerService) {}

  @Get()
  async generatePdf(@Res() res: Response) {
    const path1 = join(__dirname, '..', '..', 'uploads');

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
          .invoice-box table tr.item td{
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
                      <img src="data:image/png;base64,${this.getBase64Logo('../../../uploads/favicon.png')}" alt="Logo" class="logo"/>
                    </td>
                    <td>
                      Invoice #: 123<br />
                      Created: January 1, 2024<br />
                      Due: January 31, 2024
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
                      Company Name, Inc.<br />
                      12345 Example Street<br />
                      City, State, ZIP
                    </td>
                    <td>
                      Customer Name<br />
                      customer@example.com
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Imágenes añadidas aquí -->
            <tr>
              <td colspan="2">
                <div class="images images_container">
                  <img src="data:image/png;base64,${this.getBase64Logo('../../../uploads/favicon.png')}" />
                  <img src="data:image/png;base64,${this.getBase64Logo('../../../uploads/favicon.png')}" />
                  <img src="data:image/png;base64,${this.getBase64Logo('../../../uploads/favicon.png')}" />
                </div>
              </td>
            </tr>

            <tr class="heading">
              <td>Payment Method</td>
              <td>Check #</td>
            </tr>
            <tr class="details">
              <td>Check</td>
              <td>1000</td>
            </tr>
            <tr class="heading">
              <td>Item</td>
              <td>Price</td>
            </tr>
            <tr class="item">
              <td>Website Design</td>
              <td>$300.00</td>
            </tr>
            <tr class="item">
              <td>Hosting (3 months)</td>
              <td>$75.00</td>
            </tr>
            <tr class="item last">
              <td>Domain Name (1 year)</td>
              <td>$10.00</td>
            </tr>
            <tr class="total">
              <td></td>
              <td>Total: $385.00</td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `;

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
