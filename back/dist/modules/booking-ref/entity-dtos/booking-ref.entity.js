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
exports.BookingRefEntity = void 0;
const container_entity_1 = require("../../container/entity-dtos/container.entity");
const typeorm_1 = require("typeorm");
let BookingRefEntity = class BookingRefEntity {
};
exports.BookingRefEntity = BookingRefEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BookingRefEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BookingRefEntity.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipment-date' }),
    __metadata("design:type", Date)
], BookingRefEntity.prototype, "shipmentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receipt-date' }),
    __metadata("design:type", Date)
], BookingRefEntity.prototype, "receiptDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BookingRefEntity.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BookingRefEntity.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => container_entity_1.ContainerEntity, (container) => container.bookingRef),
    __metadata("design:type", Array)
], BookingRefEntity.prototype, "containers", void 0);
exports.BookingRefEntity = BookingRefEntity = __decorate([
    (0, typeorm_1.Entity)()
], BookingRefEntity);
//# sourceMappingURL=booking-ref.entity.js.map