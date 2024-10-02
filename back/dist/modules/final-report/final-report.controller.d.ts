import { FinalReportService } from './final-report.service';
import { FinalReportEntity } from './entity-dtos/final-report.entity';
export declare class FinalReportController {
    private readonly finalReportService;
    constructor(finalReportService: FinalReportService);
    findAll(): Promise<FinalReportEntity[]>;
    findOne(id: number): Promise<FinalReportEntity>;
    create(finalReport: FinalReportEntity, images: Express.Multer.File[]): Promise<FinalReportEntity>;
    update(id: number, finalReport: FinalReportEntity, images: Express.Multer.File[]): Promise<FinalReportEntity>;
    remove(id: number): Promise<void>;
}
