import { AdminRepository } from './admin.repository';
import { SignUpInfoAdminDto } from './dto/signup-info-admin.dto';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthAdminService {
    private adminRepository;
    private jwtService;
    private logger;
    constructor(adminRepository: AdminRepository, jwtService: JwtService);
    signup(signUpInfoAdminDto: SignUpInfoAdminDto): Promise<Object>;
    login(loginForm: AuthCredentialsDto): Promise<any>;
}
