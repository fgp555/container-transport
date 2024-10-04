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
exports.PuppeteerController = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const puppeteer_service_1 = require("./puppeteer.service");
const final_report_service_1 = require("../final-report/final-report.service");
let PuppeteerController = class PuppeteerController {
    constructor(pdfService, finalReportService) {
        this.pdfService = pdfService;
        this.finalReportService = finalReportService;
    }
    async generatePdf(res, id) {
        console.log("id", id);
        const imagesDataById = await this.getImagesDataById(id);
        console.log("imagesDataById", imagesDataById);
        if (!imagesDataById) {
            throw new Error('No se encontraron imágenes');
        }
        const imagesHtml = imagesDataById.map(image => `<img src="data:image/png;base64,${this.getBase64Image('../' + image.path)}" />`).join('');
        const htmlContent = `
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
    getBase64Image(imagePath) {
        const logoPath = path.resolve(__dirname, '..', '..', imagePath);
        const logo = fs.readFileSync(logoPath);
        return logo.toString('base64');
    }
    async getImagesData() {
        const reports = await this.finalReportService.findAll();
        return reports.flatMap(report => report.images);
    }
    async getImagesDataById(id) {
        const report = await this.finalReportService.findOne(id);
        if (!report) {
            throw new Error('Report not found');
        }
        return report.images;
    }
};
exports.PuppeteerController = PuppeteerController;
__decorate([
    (0, common_1.Get)('/imagesDataById/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PuppeteerController.prototype, "generatePdf", null);
exports.PuppeteerController = PuppeteerController = __decorate([
    (0, common_1.Controller)('puppeteer'),
    __metadata("design:paramtypes", [puppeteer_service_1.PuppeteerService,
        final_report_service_1.FinalReportService])
], PuppeteerController);
//# sourceMappingURL=puppeteer.controller.js.map