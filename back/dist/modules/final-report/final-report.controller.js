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
exports.FinalReportController = void 0;
const common_1 = require("@nestjs/common");
const final_report_service_1 = require("./final-report.service");
const final_report_entity_1 = require("./entity-dtos/final-report.entity");
let FinalReportController = class FinalReportController {
    constructor(finalReportService) {
        this.finalReportService = finalReportService;
    }
    findAll() {
        return this.finalReportService.findAll();
    }
    findOne(id) {
        return this.finalReportService.findOne(id);
    }
    create(finalReport) {
        return this.finalReportService.create(finalReport);
    }
    update(id, finalReport) {
        return this.finalReportService.update(id, finalReport);
    }
    remove(id) {
        return this.finalReportService.remove(id);
    }
};
exports.FinalReportController = FinalReportController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FinalReportController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FinalReportController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [final_report_entity_1.FinalReportEntity]),
    __metadata("design:returntype", void 0)
], FinalReportController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, final_report_entity_1.FinalReportEntity]),
    __metadata("design:returntype", void 0)
], FinalReportController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FinalReportController.prototype, "remove", null);
exports.FinalReportController = FinalReportController = __decorate([
    (0, common_1.Controller)('final-report'),
    __metadata("design:paramtypes", [final_report_service_1.FinalReportService])
], FinalReportController);
//# sourceMappingURL=final-report.controller.js.map