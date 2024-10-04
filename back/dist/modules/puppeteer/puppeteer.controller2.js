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
const puppeteer_service_1 = require("./puppeteer.service");
const image_service_1 = require("../image/image.service");
const fs = require("fs");
const path_1 = require("path");
let PuppeteerController = class PuppeteerController {
    constructor(pdfService, imageService) {
        this.pdfService = pdfService;
        this.imageService = imageService;
    }
    async generatePdf(res) {
        const templatePath = (0, path_1.join)(__dirname, '..', '..', '..', 'template', 'template.html');
        let htmlContent = fs.readFileSync(templatePath, 'utf8');
        const images = await this.imageService.findAll();
        console.log('images', images);
        console.log('images[0].path', '../../' + images[0].path);
        if (images.length >= 3) {
            const image1Base64 = this.getBase64FromPath(images[0].path);
            const image2Base64 = this.getBase64FromPath(images[1].path);
            const image3Base64 = this.getBase64FromPath(images[2].path);
            htmlContent = htmlContent
                .replace('{{image1}}', `data:image/png;base64,${image1Base64}`)
                .replace('{{image2}}', `data:image/png;base64,${image2Base64}`)
                .replace('{{image3}}', `data:image/png;base64,${image3Base64}`);
        }
        else {
            htmlContent = htmlContent
                .replace('{{image1}}', '')
                .replace('{{image2}}', '')
                .replace('{{image3}}', '');
        }
        const logoBase64 = this.getBase64Logo('uploads/favicon.png');
        htmlContent = htmlContent.replace('{{logo}}', `data:image/png;base64,${logoBase64}`);
        const pdfBuffer = await this.pdfService.generatePdf(htmlContent);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="invoice.pdf"',
            'Content-Length': pdfBuffer.length,
        });
        res.end(pdfBuffer);
    }
    getBase64FromPath(filePath) {
        const fullPath = (0, path_1.join)(__dirname, '..', '..', '..', filePath);
        const file = fs.readFileSync(fullPath);
        return file.toString('base64');
    }
    getBase64Logo(pathString) {
        const logoPath = (0, path_1.join)(__dirname, '..', '..', '..', pathString);
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
    __metadata("design:paramtypes", [puppeteer_service_1.PuppeteerService,
        image_service_1.ImageService])
], PuppeteerController);
//# sourceMappingURL=puppeteer.controller2.js.map