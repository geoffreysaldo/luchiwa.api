import { Controller, Post, Body } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { SignUpInfoAdminDto } from './dto/signup-info-admin.dto';

@Controller('auth-admin')
export class AuthAdminController {

    constructor(private authAdminService: AuthAdminService){}


    @Post("/signup")
    signup(@Body() signupForm: SignUpInfoAdminDto): Promise<Object>{
        return this.authAdminService.signup(signupForm);
    }

    @Post("/signin")
    login(@Body() loginForm: AuthCredentialsDto): Promise<any>{
        return this.authAdminService.login(loginForm);
    }


}
