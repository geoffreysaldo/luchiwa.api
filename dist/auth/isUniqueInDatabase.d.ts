import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { UserRepository } from "./user.repository";
export declare class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(email: any, args: ValidationArguments): any;
}
export declare function IsUserAlreadyExist(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
