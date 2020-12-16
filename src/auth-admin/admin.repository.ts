import { Repository, EntityRepository } from 'typeorm';
import { Admin } from './admin.entity';
import { SignUpInfoAdminDto} from './dto/signup-info-admin.dto';
import * as bcrypt from 'bcrypt';
import * as randomstring from 'randomstring';
import { ConflictException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin>{

    async signUp(signUpInfoAdminDto: SignUpInfoAdminDto): Promise<Object>{

        const admin = new Admin();
        admin.email = signUpInfoAdminDto.email;
        admin.salt = await bcrypt.genSalt();
        admin.password = await this.hashPassword(signUpInfoAdminDto.password, admin.salt);

        try {
            await admin.save();
            return {message:'Administrateur créé'}
        } catch(error){
            if(error.code === 11000){
                throw new ConflictException('Cet email existe déjà')
            }
        }
    }

    async validateUserPassword(authCredentialsDto): Promise<Admin>{
        const { email, password} = authCredentialsDto
        const admin = await this.findOne({email});

        if(await admin.validatePassword(password)){
            return admin;
        } else {
            return null
        }
    }

    private async hashPassword(password: string, salt: string){
        return bcrypt.hash(password, salt)
    }



}