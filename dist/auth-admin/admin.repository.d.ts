import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { SignUpInfoAdminDto } from './dto/signup-info-admin.dto';
export declare class AdminRepository extends Repository<Admin> {
    signUp(signUpInfoAdminDto: SignUpInfoAdminDto): Promise<Object>;
    validateUserPassword(authCredentialsDto: any): Promise<Admin>;
    private hashPassword;
}
