import { BaseEntity, Entity, Column, ObjectIdColumn, Unique} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {IsEmail} from "class-validator";

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    @IsEmail()
    email: string

    @Column()
    password: string

    @Column({type: 'boolean', default: false})
    isActive: boolean = false;

    @Column()
    salt: string

    @Column()
    secretToken: string

    @Column()
    lastname: string;

    @Column()
    firstname: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    zipcode: string;

    @Column()
    phone: string;

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
