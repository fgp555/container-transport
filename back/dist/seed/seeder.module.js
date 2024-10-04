"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("../modules/admin/entity-dtos/admin.entity");
const booking_ref_entity_1 = require("../modules/booking-ref/entity-dtos/booking-ref.entity");
const container_entity_1 = require("../modules/container/entity-dtos/container.entity");
const client_entity_1 = require("../modules/client/entity-dtos/client.entity");
const package_entity_1 = require("../modules/package/entity-dtos/package.entity");
const image_entity_1 = require("../modules/image/entity-dtos/image.entity");
const final_report_entity_1 = require("../modules/final-report/entity-dtos/final-report.entity");
let SeederModule = class SeederModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async onModuleInit() {
        await this.seedData();
    }
    async seedData() {
        const adminRepo = this.dataSource.getRepository(admin_entity_1.AdminEntity);
        const bookingRefRepo = this.dataSource.getRepository(booking_ref_entity_1.BookingRefEntity);
        const containerRepo = this.dataSource.getRepository(container_entity_1.ContainerEntity);
        const clientRepo = this.dataSource.getRepository(client_entity_1.ClientEntity);
        const packageRepo = this.dataSource.getRepository(package_entity_1.PackageEntity);
        const imageRepo = this.dataSource.getRepository(image_entity_1.ImageEntity);
        const finalReportRepo = this.dataSource.getRepository(final_report_entity_1.FinalReportEntity);
        const admin = adminRepo.create({
            email: 'admin@mail.com',
            password: 'admin123',
        });
        await adminRepo.save(admin);
        const client = clientRepo.create({
            name: 'Cliente 1',
            email: 'user@mail.com',
            phone: '54333444222',
            issuingCompany: 'company Iss1',
            receivingCompany: 'company Rec1',
        });
        await clientRepo.save(client);
        const image1 = imageRepo.create({ path: 'uploads/favicon.jpg' });
        const image2 = imageRepo.create({ path: 'uploads/favicon.jpg' });
        await imageRepo.save([image1, image2]);
        const bookingRef = bookingRefRepo.create({
            number: 'HAME90065700',
            shipmentDate: new Date('2024-05-08'),
            receiptDate: new Date('2024-05-09'),
            from: 'New Work',
            to: 'Londres',
            containers: [],
        });
        await bookingRefRepo.save(bookingRef);
        const container = containerRepo.create({
            containerNo: 'TRIU 867 293-5',
            bookingRef: bookingRef,
            openingDate: new Date('2024-05-06'),
            closingDate: new Date('2024-05-08'),
        });
        await containerRepo.save(container);
        const packageEntity = packageRepo.create({
            description: 'florero',
            cantidad: 2,
            client: client,
        });
        await packageRepo.save(packageEntity);
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
};
exports.SeederModule = SeederModule;
exports.SeederModule = SeederModule = __decorate([
    (0, common_1.Module)({
        imports: [],
    }),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], SeederModule);
//# sourceMappingURL=seeder.module.js.map