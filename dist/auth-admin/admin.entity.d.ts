import { BaseEntity } from "typeorm";
export declare class Admin extends BaseEntity {
    _id: string;
    email: string;
    password: string;
    salt: string;
    validatePassword(password: string): Promise<boolean>;
}
