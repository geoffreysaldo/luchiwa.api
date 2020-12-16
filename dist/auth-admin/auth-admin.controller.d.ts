import { AuthAdminService } from './auth-admin.service';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { SignUpInfoAdminDto } from './dto/signup-info-admin.dto';
export declare class AuthAdminController {
    private authAdminService;
    constructor(authAdminService: AuthAdminService);
    signup(signupForm: SignUpInfoAdminDto): Promise<Object>;
    login(loginForm: AuthCredentialsDto): Promise<any>;
}
