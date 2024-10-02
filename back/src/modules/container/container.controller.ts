import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ContainerService } from './container.service';
import { ContainerEntity } from './entity-dtos/container.entity';

@Controller('container')
export class ContainerController {
  constructor(private readonly containerService: ContainerService) {}

  @Get()
  findAll() {
    return this.containerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.containerService.findOne(id);
  }

  @Post()
  create(@Body() container: ContainerEntity) {
    return this.containerService.create(container);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() container: ContainerEntity) {
    return this.containerService.update(id, container);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.containerService.remove(id);
  }
}
