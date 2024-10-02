import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './modules/admin/entity-dtos/admin.entity';
import { BookingRefEntity } from './modules/booking-ref/entity-dtos/booking-ref.entity';
import { ContainerEntity } from './modules/container/entity-dtos/container.entity';
import { ClientEntity } from './modules/client/entity-dtos/client.entity';
import { PackageEntity } from './modules/package/entity-dtos/package.entity';
import { ImageEntity } from './modules/image/entity-dtos/image.entity';
import { FinalReportEntity } from './modules/final-report/entity-dtos/final-report.entity';
import { AdminController } from './modules/admin/admin.controller';
import { AdminService } from './modules/admin/admin.service';
import { BookingRefController } from './modules/booking-ref/booking-ref.controller';
import { BookingRefService } from './modules/booking-ref/booking-ref.service';
import { ClientController } from './modules/client/client.controller';
import { ClientService } from './modules/client/client.service';
import { ContainerController } from './modules/container/container.controller';
import { ContainerService } from './modules/container/container.service';
import { FinalReportController } from './modules/final-report/final-report.controller';
import { FinalReportService } from './modules/final-report/final-report.service';
import { ImageController } from './modules/image/image.controller';
import { ImageService } from './modules/image/image.service';
import { PackageController } from './modules/package/package.controller';
import { PackageService } from './modules/package/package.service';
import { SeederModule } from './seed/seeder.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'shipping_db',
      entities: [
        AdminEntity,
        BookingRefEntity,
        ContainerEntity,
        ClientEntity,
        PackageEntity,
        ImageEntity,
        FinalReportEntity,
      ],
      synchronize: true,
      logging: false,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([
      AdminEntity,
      BookingRefEntity,
      ContainerEntity,
      ClientEntity,
      PackageEntity,
      ImageEntity,
      FinalReportEntity,
    ]),
    SeederModule,
  ],
  controllers: [
    AppController,
    AdminController,
    BookingRefController,
    ClientController,
    ContainerController,
    FinalReportController,
    ImageController,
    PackageController,
  ],
  providers: [
    AppService,
    AdminService,
    BookingRefService,
    ClientService,
    ContainerService,
    FinalReportService,
    ImageService,
    PackageService,
  ],
})
export class AppModule {}
