import { Repository } from 'typeorm';
import { ImageEntity } from './entity-dtos/image.entity';
export declare class ImageService {
    private imageRepository;
    constructor(imageRepository: Repository<ImageEntity>);
    findAll(): Promise<ImageEntity[]>;
    findOne(id: number): Promise<ImageEntity>;
    create(image: ImageEntity): Promise<ImageEntity>;
    update(id: number, image: ImageEntity): Promise<ImageEntity>;
    remove(id: number): Promise<void>;
}
