import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entity-dtos/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])], // Importa el modelo de la entidad
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
