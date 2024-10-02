import { ImageService } from './image.service';
import { ImageEntity } from './entity-dtos/image.entity';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    findAll(): Promise<ImageEntity[]>;
    findOne(id: number): Promise<ImageEntity>;
    create(image: ImageEntity): Promise<ImageEntity>;
    update(id: number, image: ImageEntity): Promise<ImageEntity>;
    remove(id: number): Promise<void>;
}
