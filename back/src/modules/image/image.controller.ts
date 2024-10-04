// back/src/modules/image/image.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageEntity } from './entity-dtos/image.entity';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.imageService.findOne(id);
  }

  @Post()
  create(@Body() image: ImageEntity) {
    return this.imageService.create(image);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() image: ImageEntity) {
    return this.imageService.update(id, image);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.imageService.remove(id);
  }
}
