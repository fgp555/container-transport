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
exports.FinalReportEntity = void 0;
const image_entity_1 = require("../../image/entity-dtos/image.entity");
const typeorm_1 = require("typeorm");
let FinalReportEntity = class FinalReportEntity {
};
exports.FinalReportEntity = FinalReportEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FinalReportEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'b-l-no' }),
    __metadata("design:type", String)
], FinalReportEntity.prototype, "bLNo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FinalReportEntity.prototype, "consignee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'marks' }),
    __metadata("design:type", String)
], FinalReportEntity.prototype, "marks", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'qty-pkgs' }),
    __metadata("design:type", Number)
], FinalReportEntity.prototype, "qtyPkgs", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FinalReportEntity.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FinalReportEntity.prototype, "pallet", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'legend' }),
    __metadata("design:type", String)
], FinalReportEntity.prototype, "legend", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => image_entity_1.ImageEntity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], FinalReportEntity.prototype, "images", void 0);
exports.FinalReportEntity = FinalReportEntity = __decorate([
    (0, typeorm_1.Entity)()
], FinalReportEntity);
//# sourceMappingURL=final-report.entity.js.map