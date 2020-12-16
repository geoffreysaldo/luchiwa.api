import {IsEmail, IsString, MinLength, MaxLength, Matches} from 'class-validator';

export class AuthCredentialsDto {
    @IsEmail({}, { message: 'Votre email est invalide' })
    email: string;

    @IsString()
    @MinLength(8, {message: 'Votre mot de passe est trop court'})
    @MaxLength(20, {message: 'Votre mot de passe est trop long'})
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message:"Le mot de passe est trop faible"})
    password: string
}