import { Response } from 'express';
import { PuppeteerService } from './puppeteer.service';
import { FinalReportService } from '../final-report/final-report.service';
export declare class PuppeteerController {
    private readonly pdfService;
    private readonly finalReportService;
    constructor(pdfService: PuppeteerService, finalReportService: FinalReportService);
    generatePdf(res: Response): Promise<void>;
    private getBase64Image;
    private getImagesData;
}
