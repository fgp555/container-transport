"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlPdfService = void 0;
const common_1 = require("@nestjs/common");
const pdf = require("html-pdf");
const fs = require("fs");
const path = require("path");
let HtmlPdfService = class HtmlPdfService {
    async generatePdf(data) {
        const logoPath = path.resolve(__dirname, '..', '..', '..', 'uploads', 'favicon.jpg');
        const logoBase64 = this.getBase64Image(logoPath);
        const htmlContentWithLogo = `
      <html>
      <head>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            font-size: 12px; /* Ajusta el tamaño exacto de la fuente */
          }
          h1 { color: #333; }
          .logo { text-align: center; margin-bottom: 20px; }
          .logo img { width: 150px; }
        </style>
      </head>
      <body>
        <div class="logo">
          <img src="data:image/png;base64,${logoBase64}" />
        </div>
        ${data.content} <!-- Contenido HTML dinámico recibido -->
      </body>
      </html>
    `;
        const options = {
            format: 'A3',
            border: {
                top: '1in',
                right: '1in',
                bottom: '1in',
                left: '1in',
            },
            dpi: 300,
            zoomFactor: '1',
        };
        return new Promise((resolve, reject) => {
            pdf.create(htmlContentWithLogo, options).toBuffer((err, buffer) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(buffer);
                }
            });
        });
    }
    getBase64Image(imgPath) {
        const image = fs.readFileSync(imgPath);
        return Buffer.from(image).toString('base64');
    }
};
exports.HtmlPdfService = HtmlPdfService;
exports.HtmlPdfService = HtmlPdfService = __decorate([
    (0, common_1.Injectable)()
], HtmlPdfService);
//# sourceMappingURL=html-pdf.service.js.map