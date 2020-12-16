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
exports.SignUpInfoAdminDto = void 0;
const class_validator_1 = require("class-validator");
class SignUpInfoAdminDto {
}
__decorate([
    class_validator_1.IsEmail({}, { message: 'Votre email est invalide' }),
    class_validator_1.IsNotEmpty({ message: 'Veuillez remplir votre email' }),
    __metadata("design:type", String)
], SignUpInfoAdminDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(8, { message: 'Votre mot de passe est trop court' }),
    class_validator_1.MaxLength(20, { message: 'Votre mot de passe est trop long' }),
    class_validator_1.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "Le mot de passe est trop faible" }),
    class_validator_1.IsNotEmpty({ message: 'Veuillez remplir votre mot de passe' }),
    __metadata("design:type", String)
], SignUpInfoAdminDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(8, { message: 'Votre mot de passe est trop court' }),
    class_validator_1.MaxLength(20, { message: 'Votre mot de passe est trop long' }),
    class_validator_1.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "Le mot de passe est trop faible" }),
    class_validator_1.IsNotEmpty({ message: 'Veuillez remplir votre mot de passe' }),
    __metadata("design:type", String)
], SignUpInfoAdminDto.prototype, "checkPassword", void 0);
exports.SignUpInfoAdminDto = SignUpInfoAdminDto;
//# sourceMappingURL=signup-info-admin.dto.js.map