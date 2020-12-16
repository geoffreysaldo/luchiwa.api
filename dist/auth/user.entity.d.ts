import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    _id: string;
    email: string;
    password: string;
    isActive: boolean;
    salt: string;
    secretToken: string;
    lastname: string;
    firstname: string;
    address: string;
    city: string;
    zipcode: string;
    phone: string;
    validatePassword(password: string): Promise<boolean>;
}
