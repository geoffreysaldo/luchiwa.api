import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { EmailDto } from './dto/email.dto';
import { SignUpInfoDto } from './dto/signup-info.dto';
import { UserInfoDto } from './dto/user-info.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpInfoDto: SignUpInfoDto): Promise<Object>;
    signIn(authCredentailsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    getUserInfo(user: User): User;
    askUpdatePassword(user: User): Promise<Object>;
    forgetPassword(email: EmailDto): Promise<Object>;
    updatePassword(token: string, passwords: UpdatePasswordDto): Promise<Object>;
    validate(token: string): Promise<Object>;
    updateUser(user: User, userInfoDto: UserInfoDto): Promise<Object>;
}
