import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BookingRefService } from './booking-ref.service';
import { BookingRefEntity } from './entity-dtos/booking-ref.entity';

@Controller('booking-ref')
export class BookingRefController {
  constructor(private readonly bookingRefService: BookingRefService) {}

  @Get()
  findAll() {
    return this.bookingRefService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookingRefService.findOne(id);
  }

  @Post()
  create(@Body() bookingRef: BookingRefEntity) {
    return this.bookingRefService.create(bookingRef);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() bookingRef: BookingRefEntity) {
    return this.bookingRefService.update(id, bookingRef);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bookingRefService.remove(id);
  }
}
