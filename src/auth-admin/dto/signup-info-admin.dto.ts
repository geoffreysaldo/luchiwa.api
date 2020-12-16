import { IsNotEmpty, Matches, MinLength, IsString, MaxLength, IsEmail } from "class-validator";

export class SignUpInfoAdminDto {
    @IsEmail({}, { message: 'Votre email est invalide' })
    @IsNotEmpty({message: 'Veuillez remplir votre email'})
    email: string;

    @IsString()
    @MinLength(8, {message: 'Votre mot de passe est trop court'})
    @MaxLength(20, {message: 'Votre mot de passe est trop long'})
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message:"Le mot de passe est trop faible"})
    @IsNotEmpty({message: 'Veuillez remplir votre mot de passe'})
    password: string;

    @IsString()
    @MinLength(8, {message: 'Votre mot de passe est trop court'})
    @MaxLength(20, {message: 'Votre mot de passe est trop long'})
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message:"Le mot de passe est trop faible"})
    @IsNotEmpty({message: 'Veuillez remplir votre mot de passe'})
    checkPassword: string;
}