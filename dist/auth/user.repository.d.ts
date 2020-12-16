import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SignUpInfoDto } from './dto/signup-info.dto';
export declare class UserRepository extends Repository<User> {
    signUp(signUpInfoDto: SignUpInfoDto): Promise<Object>;
    validateUserPassword(authCredentialsDto: any): Promise<any>;
    validateUserAccount(token: any): Promise<Object>;
    askUpdatePassword(user: User): Promise<Object>;
    forgetPassword(email: string): Promise<Object>;
    updatePassword(token: any, updatePassword: UpdatePasswordDto): Promise<Object>;
    private hashPassword;
}
