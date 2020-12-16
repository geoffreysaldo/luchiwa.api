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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async signUp(signUpInfoDto) {
        if (signUpInfoDto.password !== signUpInfoDto.checkPassword) {
            throw new common_1.BadRequestException("Veuillez vérifier votre confirmation de mot de passe");
        }
        return this.userRepository.signUp(signUpInfoDto);
    }
    async signIn(authCredentialsDto) {
        const user = await this.userRepository.validateUserPassword(authCredentialsDto);
        if (!user) {
            throw new common_1.UnauthorizedException('Veuillez vérifier email et mot de passe');
        }
        const payload = { email: user.email };
        const accessToken = await this.jwtService.sign(payload);
        return { lastname: user.lastname, firstname: user.firstname, email: user.email, id: user._id, accessToken: accessToken, expiresIn: 1800 };
    }
    async askUpdatePassword(user) {
        const askUpdatePassword = await this.userRepository.askUpdatePassword(user);
        return askUpdatePassword;
    }
    async forgetPassword(email) {
        const forgetPassword = await this.userRepository.forgetPassword(email.email);
        return forgetPassword;
    }
    async updatePassword(token, passwords) {
        const updatePassword = await this.userRepository.updatePassword(token, passwords);
        return updatePassword;
    }
    async validateAccount(token) {
        const validation = await this.userRepository.validateUserAccount(token);
        return validation;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map