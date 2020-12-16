import {Matches, IsString, MinLength, MaxLength} from 'class-validator';

export class UpdatePasswordDto {
    @IsString()
    @MinLength(8, {message: 'Votre mot de passe est trop court'})
    @MaxLength(20, {message: 'Votre mot de passe est trop long'})
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message:"Le mot de passe est trop faible"})
    password: string;

    @IsString()
    @MinLength(8, {message: 'Votre mot de passe est trop court'})
    @MaxLength(20, {message: 'Votre mot de passe est trop long'})
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message:"Le mot de passe est trop faible"})
    checkPassword: string
}