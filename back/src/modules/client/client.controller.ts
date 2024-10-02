import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientEntity } from './entity-dtos/client.entity';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientService.findOne(id);
  }

  @Post()
  create(@Body() client: ClientEntity) {
    return this.clientService.create(client);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() client: ClientEntity) {
    return this.clientService.update(id, client);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientService.remove(id);
  }
}
