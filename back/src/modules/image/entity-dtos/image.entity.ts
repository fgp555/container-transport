import { FinalReportEntity } from 'src/modules/final-report/entity-dtos/final-report.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { FinalReportEntity } from './final-report.entity';  // Ajusta la ruta según tu estructura

@Entity()
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  path: string;

  @ManyToOne(() => FinalReportEntity, (finalReport) => finalReport.images, { onDelete: 'CASCADE' })
  finalReport: FinalReportEntity;
}
