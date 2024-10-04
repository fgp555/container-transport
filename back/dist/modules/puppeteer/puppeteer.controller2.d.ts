import { Response } from 'express';
import { PuppeteerService } from './puppeteer.service';
import { ImageService } from '../image/image.service';
export declare class PuppeteerController {
    private readonly pdfService;
    private readonly imageService;
    constructor(pdfService: PuppeteerService, imageService: ImageService);
    generatePdf(res: Response): Promise<void>;
    private getBase64FromPath;
    private getBase64Logo;
}
