import { Repository } from 'typeorm';
import { FinalReportEntity } from './entity-dtos/final-report.entity';
export declare class FinalReportService {
    private finalReportRepository;
    constructor(finalReportRepository: Repository<FinalReportEntity>);
    findAll(): Promise<FinalReportEntity[]>;
    findOne(id: number): Promise<FinalReportEntity>;
    create(finalReport: FinalReportEntity): Promise<FinalReportEntity>;
    update(id: number, finalReport: FinalReportEntity): Promise<FinalReportEntity>;
    remove(id: number): Promise<void>;
}
