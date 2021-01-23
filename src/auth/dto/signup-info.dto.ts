import { IsOptional, IsEmail, IsString, MinLength, MaxLength, Matches, Length, IsNotEmpty } from 'class-validator'

export class SignUpInfoDto {
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


    @IsString()
    @MinLength(2, {message: 'Votre nom est trop court'})
    @MaxLength(20, {message: 'Votre nom est trop long'})
    @IsNotEmpty({message: 'Veuillez remplir votre nom'})
    lastname: string;

    @IsString()
    @MinLength(2, {message: 'Votre prénom est trop court'})
    @MaxLength(20, {message: 'Votre prénom est trop long'})
    @IsNotEmpty({message: 'Veuillez remplir votre prénom'})
    firstname: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    city: string;

    @IsString()
    @IsOptional()
    zipcode: string;
    
    @IsString()
    @IsNotEmpty({message: 'Veuillez remplir votre numéro de téléphone'})
    @Length(10, 10)
    phone: string;
}