import { BaseEntity, Entity, Column, ObjectIdColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class Admin extends BaseEntity{
    @ObjectIdColumn()
    _id: string;

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    salt: string;

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}