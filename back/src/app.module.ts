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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
