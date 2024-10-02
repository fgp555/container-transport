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
exports.ContainerEntity = void 0;
const booking_ref_entity_1 = require("../../booking-ref/entity-dtos/booking-ref.entity");
const typeorm_1 = require("typeorm");
let ContainerEntity = class ContainerEntity {
};
exports.ContainerEntity = ContainerEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ContainerEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'container-no' }),
    __metadata("design:type", String)
], ContainerEntity.prototype, "containerNo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => booking_ref_entity_1.BookingRefEntity, (bookingRef) => bookingRef.containers),
    __metadata("design:type", booking_ref_entity_1.BookingRefEntity)
], ContainerEntity.prototype, "bookingRef", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'opening-date' }),
    __metadata("design:type", Date)
], ContainerEntity.prototype, "openingDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'closing-date' }),
    __metadata("design:type", Date)
], ContainerEntity.prototype, "closingDate", void 0);
exports.ContainerEntity = ContainerEntity = __decorate([
    (0, typeorm_1.Entity)()
], ContainerEntity);
//# sourceMappingURL=container.entity.js.map