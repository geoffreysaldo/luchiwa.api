"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdminModule = void 0;
const common_1 = require("@nestjs/common");
const auth_admin_service_1 = require("./auth-admin.service");
const auth_admin_controller_1 = require("./auth-admin.controller");
const typeorm_1 = require("@nestjs/typeorm");
const admin_repository_1 = require("./admin.repository");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
let AuthAdminModule = class AuthAdminModule {
};
AuthAdminModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([admin_repository_1.AdminRepository]),
            jwt_1.JwtModule.register({
                secret: 'topSecret51',
                signOptions: {
                    expiresIn: 1800,
                }
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' })
        ],
        providers: [
            auth_admin_service_1.AuthAdminService,
        ],
        exports: [
            passport_1.PassportModule
        ],
        controllers: [auth_admin_controller_1.AuthAdminController]
    })
], AuthAdminModule);
exports.AuthAdminModule = AuthAdminModule;
//# sourceMappingURL=auth-admin.module.js.map