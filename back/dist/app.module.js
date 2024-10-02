"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("./modules/admin/entity-dtos/admin.entity");
const booking_ref_entity_1 = require("./modules/booking-ref/entity-dtos/booking-ref.entity");
const container_entity_1 = require("./modules/container/entity-dtos/container.entity");
const client_entity_1 = require("./modules/client/entity-dtos/client.entity");
const package_entity_1 = require("./modules/package/entity-dtos/package.entity");
const image_entity_1 = require("./modules/image/entity-dtos/image.entity");
const final_report_entity_1 = require("./modules/final-report/entity-dtos/final-report.entity");
const admin_controller_1 = require("./modules/admin/admin.controller");
const admin_service_1 = require("./modules/admin/admin.service");
const booking_ref_controller_1 = require("./modules/booking-ref/booking-ref.controller");
const booking_ref_service_1 = require("./modules/booking-ref/booking-ref.service");
const client_controller_1 = require("./modules/client/client.controller");
const client_service_1 = require("./modules/client/client.service");
const container_controller_1 = require("./modules/container/container.controller");
const container_service_1 = require("./modules/container/container.service");
const final_report_controller_1 = require("./modules/final-report/final-report.controller");
const final_report_service_1 = require("./modules/final-report/final-report.service");
const image_controller_1 = require("./modules/image/image.controller");
const image_service_1 = require("./modules/image/image.service");
const package_controller_1 = require("./modules/package/package.controller");
const package_service_1 = require("./modules/package/package.service");
const seeder_module_1 = require("./seed/seeder.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'shipping_db',
                entities: [
                    admin_entity_1.AdminEntity,
                    booking_ref_entity_1.BookingRefEntity,
                    container_entity_1.ContainerEntity,
                    client_entity_1.ClientEntity,
                    package_entity_1.PackageEntity,
                    image_entity_1.ImageEntity,
                    final_report_entity_1.FinalReportEntity,
                ],
                synchronize: true,
                logging: false,
                dropSchema: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([
                admin_entity_1.AdminEntity,
                booking_ref_entity_1.BookingRefEntity,
                container_entity_1.ContainerEntity,
                client_entity_1.ClientEntity,
                package_entity_1.PackageEntity,
                image_entity_1.ImageEntity,
                final_report_entity_1.FinalReportEntity,
            ]),
            seeder_module_1.SeederModule,
        ],
        controllers: [
            app_controller_1.AppController,
            admin_controller_1.AdminController,
            booking_ref_controller_1.BookingRefController,
            client_controller_1.ClientController,
            container_controller_1.ContainerController,
            final_report_controller_1.FinalReportController,
            image_controller_1.ImageController,
            package_controller_1.PackageController,
        ],
        providers: [
            app_service_1.AppService,
            admin_service_1.AdminService,
            booking_ref_service_1.BookingRefService,
            client_service_1.ClientService,
            container_service_1.ContainerService,
            final_report_service_1.FinalReportService,
            image_service_1.ImageService,
            package_service_1.PackageService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map