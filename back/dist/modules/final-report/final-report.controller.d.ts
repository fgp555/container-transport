import { FinalReportService } from './final-report.service';
import { FinalReportEntity } from './entity-dtos/final-report.entity';
export declare class FinalReportController {
    private readonly finalReportService;
    constructor(finalReportService: FinalReportService);
    findAll(): Promise<FinalReportEntity[]>;
    findOne(id: number): Promise<FinalReportEntity>;
    create(finalReport: FinalReportEntity): Promise<FinalReportEntity>;
    update(id: number, finalReport: FinalReportEntity): Promise<FinalReportEntity>;
    remove(id: number): Promise<void>;
}
