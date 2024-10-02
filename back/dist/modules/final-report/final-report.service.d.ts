import { Repository } from 'typeorm';
import { FinalReportEntity } from './entity-dtos/final-report.entity';
import { ImageEntity } from 'src/modules/image/entity-dtos/image.entity';
export declare class FinalReportService {
    private finalReportRepository;
    private imageRepository;
    constructor(finalReportRepository: Repository<FinalReportEntity>, imageRepository: Repository<ImageEntity>);
    findAll(): Promise<FinalReportEntity[]>;
    findOne(id: number): Promise<FinalReportEntity>;
    create(finalReport: FinalReportEntity, images: Express.Multer.File[]): Promise<FinalReportEntity>;
    update(id: number, finalReport: FinalReportEntity, images: Express.Multer.File[]): Promise<FinalReportEntity>;
    remove(id: number): Promise<void>;
    private saveImages;
}
