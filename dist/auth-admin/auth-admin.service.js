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
exports.AuthAdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_repository_1 = require("./admin.repository");
const auth_credentials_dto_1 = require("../auth/dto/auth-credentials.dto");
const jwt_payload_interface_1 = require("../auth/jwt-payload.interface");
const jwt_1 = require("@nestjs/jwt");
let AuthAdminService = class AuthAdminService {
    constructor(adminRepository, jwtService) {
        this.adminRepository = adminRepository;
        this.jwtService = jwtService;
    }
    async signup(signUpInfoAdminDto) {
        if (signUpInfoAdminDto.password !== signUpInfoAdminDto.checkPassword) {
            throw new common_1.BadRequestException("Veuillez vérifier votre confirmation de mot de passe");
        }
        return this.adminRepository.signUp(signUpInfoAdminDto);
    }
    async login(loginForm) {
        const admin = await this.adminRepository.validateUserPassword(loginForm);
        if (!admin) {
            console.log("erreur");
            throw new common_1.UnauthorizedException('Compte invalide');
        }
        const payload = { email: admin.email };
        const accessToken = await this.jwtService.sign(payload);
        return { email: admin.email, id: admin._id, accessToken: accessToken, expiresIn: 1800 };
    }
};
AuthAdminService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(admin_repository_1.AdminRepository)),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository,
        jwt_1.JwtService])
], AuthAdminService);
exports.AuthAdminService = AuthAdminService;
//# sourceMappingURL=auth-admin.service.js.map