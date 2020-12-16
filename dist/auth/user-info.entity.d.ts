import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
export declare class UserInfo extends BaseEntity {
    _id: string;
    lastname: string;
    firstname: string;
    address: string;
    city: string;
    zipcode: string;
    phone: string;
    userInfo: any;
    user: User;
}
