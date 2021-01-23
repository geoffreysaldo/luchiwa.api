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
exports.UserInfoDto = void 0;
const class_validator_1 = require("class-validator");
class UserInfoDto {
}
__decorate([
    class_validator_1.IsEmail({}, { message: 'Votre email est invalide' }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    class_validator_1.MinLength(5, { message: 'Votre adresse est trop courte' }),
    class_validator_1.MaxLength(50, { message: 'Votre adresse est trop longue' }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    class_validator_1.MinLength(3, { message: 'Votre ville est trop courte' }),
    class_validator_1.MaxLength(30, { message: 'Votre ville est trop longue' }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "city", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    class_validator_1.Length(5, 5),
    __metadata("design:type", String)
], UserInfoDto.prototype, "zipcode", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(10, 10),
    __metadata("design:type", String)
], UserInfoDto.prototype, "phone", void 0);
exports.UserInfoDto = UserInfoDto;
//# sourceMappingURL=user-info.dto.js.map