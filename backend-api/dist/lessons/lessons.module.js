"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsModule = void 0;
const common_1 = require("@nestjs/common");
const lessons_controller_1 = require("./lessons.controller");
const lessons_service_1 = require("./lessons.service");
const lessons_repository_1 = require("./lessons.repository");
const prisma_module_1 = require("../prisma/prisma.module");
const gamification_module_1 = require("../gamification/gamification.module");
let LessonsModule = class LessonsModule {
};
exports.LessonsModule = LessonsModule;
exports.LessonsModule = LessonsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, gamification_module_1.GamificationModule],
        controllers: [lessons_controller_1.LessonsController],
        providers: [lessons_service_1.LessonsService, lessons_repository_1.LessonsRepository],
        exports: [lessons_service_1.LessonsService],
    })
], LessonsModule);
//# sourceMappingURL=lessons.module.js.map