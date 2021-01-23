import { Controller, Post, Body, ValidationPipe, UseGuards, Param, Get, Put } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { EmailDto } from './dto/email.dto';
import { SignUpInfoDto } from './dto/signup-info.dto'
import { UserInfoDto } from './dto/user-info.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) signUpInfoDto: SignUpInfoDto): Promise<Object> {
        return this.authService.signUp(signUpInfoDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentailsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentailsDto);
    }

    @Get('user_info')
    @UseGuards(AuthGuard())
    getUserInfo(@GetUser() user: User){
        delete user.salt;
        delete user.password;
        delete user.isActive;
        return user;
    }

    @Get('/update_password')
    @UseGuards(AuthGuard())
    askUpdatePassword(@GetUser() user: User):Promise<Object>{
        return this.authService.askUpdatePassword(user)
    }

    @Post('/update_password/forget')
    forgetPassword(@Body(ValidationPipe) email: EmailDto ):Promise<Object> {
        return this.authService.forgetPassword(email)
    }

    @Post('update_password/:secretToken')
    updatePassword(@Param() token: string, @Body(ValidationPipe) passwords: UpdatePasswordDto): Promise<Object>{
        return this.authService.updatePassword(token, passwords)
    }

    @Get('validate/:token')
    validate(@Param() token: string): Promise<Object>{
        return this.authService.validateAccount(token);
    }

    @Put('update_user')
    @UseGuards(AuthGuard())
    updateUser(@GetUser() user: User, @Body(ValidationPipe) userInfoDto: UserInfoDto): Promise<Object>{
        return this.authService.updateUser(user, userInfoDto);
    }
}