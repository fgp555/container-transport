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
const path_1 = require("path");
const fs = require("fs");
const path = require("path");
const puppeteer_service_1 = require("./puppeteer.service");
let PuppeteerController = class PuppeteerController {
    constructor(pdfService) {
        this.pdfService = pdfService;
    }
    async generatePdf(res) {
        const path1 = (0, path_1.join)(__dirname, '..', '..', 'uploads');
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
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="invoice.pdf"',
            'Content-Length': pdfBuffer.length,
        });
        res.end(pdfBuffer);
    }
    getBase64Logo(pathString) {
        const logoPath = path.resolve(__dirname, pathString);
        const logo = fs.readFileSync(logoPath);
        return logo.toString('base64');
    }
};
exports.PuppeteerController = PuppeteerController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PuppeteerController.prototype, "generatePdf", null);
exports.PuppeteerController = PuppeteerController = __decorate([
    (0, common_1.Controller)('puppeteer'),
    __metadata("design:paramtypes", [puppeteer_service_1.PuppeteerService])
], PuppeteerController);
//# sourceMappingURL=puppeteer.controller3monolito.js.map