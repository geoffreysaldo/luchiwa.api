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
exports.SignUpInfoDto = void 0;
const class_validator_1 = require("class-validator");
class SignUpInfoDto {
}
__decorate([
    class_validator_1.IsEmail({}, { message: 'Votre email est invalide' }),
    class_validator_1.IsNotEmpty({ message: 'Veuillez remplir votre email' }),
    __metadata("design:type", String)
], SignUpInfoDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(8, { message: 'Votre mot de passe est trop court' }),
    class_validator_1.MaxLength(20, { message: 'Votre mot de passe est trop long' }),
    class_validator_1.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "Le mot de passe est trop faible" }),
    class_validator_1.IsNotEmpty({ message: 'Veuillez remplir votre mot de passe' }),
    __metadata("design:type", String)
], SignUpInfoDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(8, { message: 'Votre mot de passe est trop court' }),
    class_validator_1.MaxLength(20, { message: 'Votre mot de passe est trop long' }),
    class_validator_1.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "Le mot de passe est trop faible" }),
    class_validator_1.IsNotEmpty({ message: 'Veuillez remplir votre mot de passe' }),
    __metadata("design:type", String)
], SignUpInfoDto.prototype, "checkPassword", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(2, { message: 'Votre nom est trop court' }),
    class_validator_1.MaxLength(20, { message: 'Votre nom est trop long' }),
    class_validator_1.IsNotEmpty({ message: 'Veuillez remplir votre nom' }),
    __metadata("design:type", String)
], SignUpInfoDto.prototype, "lastname", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(2, { message: 'Votre prénom est trop court' }),
    class_validator_1.MaxLength(20, { message: 'Votre prénom est trop long' }),
    class_validator_1.IsNotEmpty({ message: 'Veuillez remplir votre prénom' }),
    __metadata("design:type", String)
], SignUpInfoDto.prototype, "firstname", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    class_validator_1.MinLength(5, { message: 'Votre adresse est trop courte' }),
    class_validator_1.MaxLength(50, { message: 'Votre adresse est trop longue' }),
    __metadata("design:type", String)
], SignUpInfoDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    class_validator_1.MinLength(3, { message: 'Votre ville est trop courte' }),
    class_validator_1.MaxLength(30, { message: 'Votre ville est trop longue' }),
    __metadata("design:type", String)
], SignUpInfoDto.prototype, "city", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 5),
    __metadata("design:type", String)
], SignUpInfoDto.prototype, "zipcode", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty({ message: 'Veuillez remplir votre numéro de téléphone' }),
    class_validator_1.Length(10, 10),
    __metadata("design:type", String)
], SignUpInfoDto.prototype, "phone", void 0);
exports.SignUpInfoDto = SignUpInfoDto;
//# sourceMappingURL=signup-info.dto.js.map