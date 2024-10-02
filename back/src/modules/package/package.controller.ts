import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageEntity } from './entity-dtos/package.entity';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Get()
  findAll() {
    return this.packageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.packageService.findOne(id);
  }

  @Post()
  create(@Body() packageEntity: PackageEntity) {
    return this.packageService.create(packageEntity);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() packageEntity: PackageEntity) {
    return this.packageService.update(id, packageEntity);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.packageService.remove(id);
  }
}
