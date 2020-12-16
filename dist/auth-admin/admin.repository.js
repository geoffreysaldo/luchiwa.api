"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRepository = void 0;
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("./admin.entity");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../auth/user.entity");
let AdminRepository = class AdminRepository extends typeorm_1.Repository {
    async signUp(signUpInfoAdminDto) {
        const admin = new admin_entity_1.Admin();
        admin.email = signUpInfoAdminDto.email;
        admin.salt = await bcrypt.genSalt();
        admin.password = await this.hashPassword(signUpInfoAdminDto.password, admin.salt);
        try {
            await admin.save();
            return { message: 'Administrateur créé' };
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Cet email existe déjà');
            }
        }
    }
    async validateUserPassword(authCredentialsDto) {
        const { email, password } = authCredentialsDto;
        const admin = await this.findOne({ email });
        if (await admin.validatePassword(password)) {
            return admin;
        }
        else {
            return null;
        }
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
};
AdminRepository = __decorate([
    typeorm_1.EntityRepository(admin_entity_1.Admin)
], AdminRepository);
exports.AdminRepository = AdminRepository;
//# sourceMappingURL=admin.repository.js.map