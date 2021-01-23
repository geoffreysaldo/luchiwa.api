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
exports.IsUserAlreadyExist = exports.IsUserAlreadyExistConstraint = void 0;
const class_validator_1 = require("class-validator");
const user_repository_1 = require("./user.repository");
let IsUserAlreadyExistConstraint = class IsUserAlreadyExistConstraint {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    validate(email, args) {
        console.log(email);
        return this.userRepository.findOne({ email }).then(user => {
            if (user)
                return false;
            return true;
        });
    }
};
IsUserAlreadyExistConstraint = __decorate([
    class_validator_1.ValidatorConstraint({ async: true }),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], IsUserAlreadyExistConstraint);
exports.IsUserAlreadyExistConstraint = IsUserAlreadyExistConstraint;
function IsUserAlreadyExist(validationOptions) {
    console.log("passage", validationOptions);
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint
        });
    };
}
exports.IsUserAlreadyExist = IsUserAlreadyExist;
//# sourceMappingURL=isUniqueInDatabase.js.map