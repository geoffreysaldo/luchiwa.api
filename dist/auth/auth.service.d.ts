import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { EmailDto } from './dto/email.dto';
import { SignUpInfoDto } from './dto/signup-info.dto';
import { UserInfoDto } from './dto/user-info.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private logger;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(signUpInfoDto: SignUpInfoDto): Promise<Object>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<any>;
    askUpdatePassword(user: User): Promise<Object>;
    forgetPassword(email: EmailDto): Promise<Object>;
    updatePassword(token: any, passwords: UpdatePasswordDto): Promise<Object>;
    validateAccount(token: string): Promise<Object>;
    updateUser(user: User, userInfoDto: UserInfoDto): Promise<Object>;
}
