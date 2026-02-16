"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationModule = void 0;
const common_1 = require("@nestjs/common");
const gamification_controller_1 = require("./gamification.controller");
const gamification_repository_1 = require("./gamification.repository");
const services_1 = require("./services");
const prisma_module_1 = require("../prisma/prisma.module");
let GamificationModule = class GamificationModule {
};
exports.GamificationModule = GamificationModule;
exports.GamificationModule = GamificationModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [gamification_controller_1.GamificationController],
        providers: [
            gamification_repository_1.GamificationRepository,
            services_1.XpService,
            services_1.StreaksService,
            services_1.AchievementsService,
            services_1.BadgesService,
            services_1.XpDecayService,
            services_1.GamificationService,
        ],
        exports: [
            services_1.GamificationService,
            services_1.XpService,
            services_1.StreaksService,
            services_1.AchievementsService,
            services_1.BadgesService,
            services_1.XpDecayService,
        ],
    })
], GamificationModule);
//# sourceMappingURL=gamification.module.js.map