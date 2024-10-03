import { Module, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AdminEntity } from '../modules/admin/entity-dtos/admin.entity';
import { BookingRefEntity } from '../modules/booking-ref/entity-dtos/booking-ref.entity';
import { ContainerEntity } from '../modules/container/entity-dtos/container.entity';
import { ClientEntity } from '../modules/client/entity-dtos/client.entity';
import { PackageEntity } from '../modules/package/entity-dtos/package.entity';
import { ImageEntity } from '../modules/image/entity-dtos/image.entity';
import { FinalReportEntity } from '../modules/final-report/entity-dtos/final-report.entity';

@Module({
  imports: [],
})
export class SeederModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    await this.seedData();
  }

  private async seedData() {
    const adminRepo = this.dataSource.getRepository(AdminEntity);
    const bookingRefRepo = this.dataSource.getRepository(BookingRefEntity);
    const containerRepo = this.dataSource.getRepository(ContainerEntity);
    const clientRepo = this.dataSource.getRepository(ClientEntity);
    const packageRepo = this.dataSource.getRepository(PackageEntity);
    const imageRepo = this.dataSource.getRepository(ImageEntity);
    const finalReportRepo = this.dataSource.getRepository(FinalReportEntity);

    // Seed Admin
    const admin = adminRepo.create({
      email: 'admin@mail.com',
      password: 'admin123', // Asegúrate de usar un hash en producción
    });
    await adminRepo.save(admin);

    // Seed Clients
    const client = clientRepo.create({
      name: 'Cliente 1',
      email: 'user@mail.com',
      phone: '54333444222',
      issuingCompany: 'company Iss1',
      receivingCompany: 'company Rec1',
    });
    await clientRepo.save(client);

    // Seed Images
    const image1 = imageRepo.create({ path: 'https://api.1rodemayo.com/uploads/images/images-1727990781669-872611659.jpg' });
    const image2 = imageRepo.create({ path: 'https://api.1rodemayo.com/uploads/images/images-1727990781669-872611659.jpg' });
    await imageRepo.save([image1, image2]);

    // Seed Booking Reference
    const bookingRef = bookingRefRepo.create({
      number: 'HAME90065700',
      shipmentDate: new Date('2024-05-08'),
      receiptDate: new Date('2024-05-09'),
      from: 'New Work',
      to: 'Londres',
      containers: [], // Se agregarán más tarde
    });
    await bookingRefRepo.save(bookingRef);

    // Seed Containers
    const container = containerRepo.create({
      containerNo: 'TRIU 867 293-5',
      bookingRef: bookingRef,
      openingDate: new Date('2024-05-06'),
      closingDate: new Date('2024-05-08'),
    });
    await containerRepo.save(container);

    // Seed Packages
    const packageEntity = packageRepo.create({
      description: 'florero',
      cantidad: 2,
      client: client,
    });
    await packageRepo.save(packageEntity);

    // Seed Final Report
    const finalReport = finalReportRepo.create({
      bLNo: 'BUE238550',
      consignee: 'BIO ABA SA',
      marks: '29119880',
      qtyPkgs: 2,
      remarks: '1 pallet: shrink-wrap film stretch torn off + torn paper bags',
      pallet: 'shrink-wrap film stretch torn off + torn paper bags',
      legend: 'I. Due to the poorly and/or improperly stuffed, the cargo required an extra handling. II. The load was un-palletized in order to safely handled and/or avoid damage to the cargo.',
      images: [image1, image2],
    });
    await finalReportRepo.save(finalReport);
  }
}
