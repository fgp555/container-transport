import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  path: string;
}
