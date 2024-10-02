import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminEntity } from './entity-dtos/admin.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminService.findOne(id);
  }

  @Post()
  create(@Body() admin: AdminEntity) {
    return this.adminService.create(admin);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() admin: AdminEntity) {
    return this.adminService.update(id, admin);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adminService.remove(id);
  }
}
