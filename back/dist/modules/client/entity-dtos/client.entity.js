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
exports.ClientEntity = void 0;
const typeorm_1 = require("typeorm");
const package_entity_1 = require("../../package/entity-dtos/package.entity");
let ClientEntity = class ClientEntity {
};
exports.ClientEntity = ClientEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ClientEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClientEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClientEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClientEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'issuing-company' }),
    __metadata("design:type", String)
], ClientEntity.prototype, "issuingCompany", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receiving-company' }),
    __metadata("design:type", String)
], ClientEntity.prototype, "receivingCompany", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => package_entity_1.PackageEntity, (pkg) => pkg.client),
    __metadata("design:type", Array)
], ClientEntity.prototype, "packages", void 0);
exports.ClientEntity = ClientEntity = __decorate([
    (0, typeorm_1.Entity)()
], ClientEntity);
//# sourceMappingURL=client.entity.js.map