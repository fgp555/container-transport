"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlPdfController = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const html_pdf_service_1 = require("./html-pdf.service");
const final_report_service_1 = require("../final-report/final-report.service");
const fs = require("fs");
let HtmlPdfController = class HtmlPdfController {
    constructor(pdfService, finalReportService) {
        this.pdfService = pdfService;
        this.finalReportService = finalReportService;
    }
    async createPdf(data, res) {
        try {
            const pdfBuffer = await this.pdfService.generatePdf(data);
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="document.pdf"',
                'Content-Length': pdfBuffer.length,
            });
            res.end(pdfBuffer);
        }
        catch (error) {
            console.error('Error al generar el PDF:', error);
            res.status(500).send('Error al generar el PDF');
        }
    }
    async generatePdf(res, id) {
        const finalReportById = await this.finalReportServiceFindOne(id);
        console.log('finalReportById', finalReportById);
        if (!finalReportById) {
            throw new Error('No se encontraron imágenes');
        }
        const imagesHtml = finalReportById.images
            .map((image) => `<img src="data:image/png;base64,${this.getBase64Image(image.path)}" />`)
            .join('');
        const htmlContent = `
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
    getBase64Image(imagePath) {
        const image = fs.readFileSync(path.resolve(__dirname, '..', '..', '..', imagePath));
        return Buffer.from(image).toString('base64');
    }
    async finalReportServiceFindOne(id) {
        const report = await this.finalReportService.findOne(id);
        if (!report) {
            throw new Error('Report not found');
        }
        return report;
    }
};
exports.HtmlPdfController = HtmlPdfController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HtmlPdfController.prototype, "createPdf", null);
__decorate([
    (0, common_1.Get)('/final-report/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], HtmlPdfController.prototype, "generatePdf", null);
exports.HtmlPdfController = HtmlPdfController = __decorate([
    (0, common_1.Controller)('html-pdf'),
    __metadata("design:paramtypes", [html_pdf_service_1.HtmlPdfService,
        final_report_service_1.FinalReportService])
], HtmlPdfController);
//# sourceMappingURL=html-pdf.controller.js.map