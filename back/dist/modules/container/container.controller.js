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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerController = void 0;
const common_1 = require("@nestjs/common");
const container_service_1 = require("./container.service");
const container_entity_1 = require("./entity-dtos/container.entity");
let ContainerController = class ContainerController {
    constructor(containerService) {
        this.containerService = containerService;
    }
    findAll() {
        return this.containerService.findAll();
    }
    findOne(id) {
        return this.containerService.findOne(id);
    }
    create(container) {
        return this.containerService.create(container);
    }
    update(id, container) {
        return this.containerService.update(id, container);
    }
    remove(id) {
        return this.containerService.remove(id);
    }
};
exports.ContainerController = ContainerController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContainerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContainerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [container_entity_1.ContainerEntity]),
    __metadata("design:returntype", void 0)
], ContainerController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, container_entity_1.ContainerEntity]),
    __metadata("design:returntype", void 0)
], ContainerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContainerController.prototype, "remove", null);
exports.ContainerController = ContainerController = __decorate([
    (0, common_1.Controller)('container'),
    __metadata("design:paramtypes", [container_service_1.ContainerService])
], ContainerController);
//# sourceMappingURL=container.controller.js.map