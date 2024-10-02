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
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map