import { Response } from 'express';
import { PuppeteerService } from './puppeteer.service';
export declare class PuppeteerController {
    private readonly pdfService;
    constructor(pdfService: PuppeteerService);
    generatePdf(res: Response): Promise<void>;
    private getBase64Logo;
}
