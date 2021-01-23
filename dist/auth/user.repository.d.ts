import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SignUpInfoDto } from './dto/signup-info.dto';
import { UserInfoDto } from './dto/user-info.dto';
export declare class UserRepository extends Repository<User> {
    private logger;
    signUp(signUpInfoDto: SignUpInfoDto): Promise<Object>;
    validateUserPassword(authCredentialsDto: any): Promise<any>;
    validateUserAccount(token: any): Promise<Object>;
    askUpdatePassword(user: User): Promise<Object>;
    forgetPassword(email: string): Promise<Object>;
    updatePassword(token: any, updatePassword: UpdatePasswordDto): Promise<Object>;
    updateUser(user: User, userInfoDto: UserInfoDto): Promise<Object>;
    private hashPassword;
    isUniqueEmail(email: string): Promise<boolean>;
}
