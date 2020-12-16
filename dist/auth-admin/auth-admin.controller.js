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
exports.AuthAdminController = void 0;
const common_1 = require("@nestjs/common");
const auth_admin_service_1 = require("./auth-admin.service");
const auth_credentials_dto_1 = require("../auth/dto/auth-credentials.dto");
const signup_info_admin_dto_1 = require("./dto/signup-info-admin.dto");
let AuthAdminController = class AuthAdminController {
    constructor(authAdminService) {
        this.authAdminService = authAdminService;
    }
    signup(signupForm) {
        return this.authAdminService.signup(signupForm);
    }
    login(loginForm) {
        return this.authAdminService.login(loginForm);
    }
};
__decorate([
    common_1.Post("/signup"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_info_admin_dto_1.SignUpInfoAdminDto]),
    __metadata("design:returntype", Promise)
], AuthAdminController.prototype, "signup", null);
__decorate([
    common_1.Post("/signin"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credentials_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthAdminController.prototype, "login", null);
AuthAdminController = __decorate([
    common_1.Controller('auth-admin'),
    __metadata("design:paramtypes", [auth_admin_service_1.AuthAdminService])
], AuthAdminController);
exports.AuthAdminController = AuthAdminController;
//# sourceMappingURL=auth-admin.controller.js.map