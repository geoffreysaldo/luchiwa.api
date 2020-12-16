import { Injectable, UnauthorizedException, NotAcceptableException, BadRequestException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { EmailDto } from './dto/email.dto';
import { SignUpInfoDto } from './dto/signup-info.dto';
import { sign } from 'crypto';
import { UserInfoDto } from './dto/user-info.dto';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}


    async signUp(signUpInfoDto: SignUpInfoDto): Promise<Object>{
        if(signUpInfoDto.password !== signUpInfoDto.checkPassword){
            throw new BadRequestException("Veuillez vérifier votre confirmation de mot de passe")
        }
        return this.userRepository.signUp(signUpInfoDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<any>{
        const user = await this.userRepository.validateUserPassword(authCredentialsDto);
        if(!user){
            throw new UnauthorizedException('Veuillez vérifier email et mot de passe')
        }

        const payload: JwtPayload = { email: user.email };
        const accessToken = await this.jwtService.sign(payload);
        return { lastname: user.lastname, firstname: user.firstname, email: user.email, id: user._id, accessToken: accessToken, expiresIn: 1800}
    }

    async askUpdatePassword(user: User): Promise<Object>{
        const askUpdatePassword = await this.userRepository.askUpdatePassword(user);
        return askUpdatePassword;
    }

    async forgetPassword(email: EmailDto):Promise<Object>{
        const forgetPassword = await this.userRepository.forgetPassword(email.email);
        return forgetPassword;
    }

    async updatePassword(token, passwords: UpdatePasswordDto): Promise<Object>{
        const updatePassword = await this.userRepository.updatePassword(token, passwords);
        return updatePassword;
    }

    async validateAccount(token: string): Promise<Object>{
        const validation = await this.userRepository.validateUserAccount(token);
        return validation
    }

    /*async updateUser(user: User, userInfoDto: UserInfoDto): Promise<Object>{
        const updateUser = await this.userRepository.updateUser(user, userInfoDto);
        return updateUser;
    }*/
}
