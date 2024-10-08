import { Response } from 'express';
import { HtmlPdfService } from './html-pdf.service';
import { FinalReportService } from '../final-report/final-report.service';
export declare class HtmlPdfController {
    private readonly pdfService;
    private readonly finalReportService;
    constructor(pdfService: HtmlPdfService, finalReportService: FinalReportService);
    createPdf(data: any, res: Response): Promise<void>;
    generatePdf(res: Response, id: number): Promise<void>;
    private getBase64Image;
    private getImagesDataById;
}
