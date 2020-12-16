import { IsEmail, IsOptional, IsString, MinLength, MaxLength, Length } from "class-validator";

export class UserInfoDto {
    @IsEmail({}, { message: 'Votre email est invalide' })
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    @MinLength(5, {message: 'Votre adresse est trop courte'})
    @MaxLength(50, {message: 'Votre adresse est trop longue'})
    address: string;

    @IsString()
    @IsOptional()
    @MinLength(3, {message: 'Votre ville est trop courte'})
    @MaxLength(30, {message: 'Votre ville est trop longue'})
    city: string;

    @IsString()
    @IsOptional()
    @Length(5, 5)
    zipcode: string;
    
    @IsString()
    @IsOptional()
    @Length(10, 10)
    phone: string;
}