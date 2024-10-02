import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { FinalReportService } from './final-report.service';
import { FinalReportEntity } from './entity-dtos/final-report.entity';

@Controller('final-report')
export class FinalReportController {
  constructor(private readonly finalReportService: FinalReportService) {}

  @Get()
  findAll() {
    return this.finalReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.finalReportService.findOne(id);
  }

  @Post()
  create(@Body() finalReport: FinalReportEntity) {
    return this.finalReportService.create(finalReport);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() finalReport: FinalReportEntity) {
    return this.finalReportService.update(id, finalReport);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.finalReportService.remove(id);
  }
}
