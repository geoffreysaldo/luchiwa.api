import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { SignUpInfoAdminDto } from './dto/signup-info-admin.dto';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthAdminService {

    constructor(
        @InjectRepository(AdminRepository)
        private adminRepository: AdminRepository,
        private jwtService: JwtService,
        ){}

    async signup(signUpInfoAdminDto: SignUpInfoAdminDto): Promise<Object>{
        if(signUpInfoAdminDto.password !== signUpInfoAdminDto.checkPassword){
            throw new BadRequestException("Veuillez vérifier votre confirmation de mot de passe")
        }
        return this.adminRepository.signUp(signUpInfoAdminDto)
    }

    async login(loginForm: AuthCredentialsDto): Promise<any>{
        const admin = await this.adminRepository.validateUserPassword(loginForm);

        if(!admin){
            console.log("erreur")
            throw new UnauthorizedException('Compte invalide')
        }

        const payload: JwtPayload = { email: admin.email };
        const accessToken = await this.jwtService.sign(payload);
        return { email: admin.email, id: admin._id, accessToken: accessToken, expiresIn: 1800 }
    }
}
