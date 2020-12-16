import {IsEmail, IsString, MinLength, MaxLength, Matches} from 'class-validator';

export class EmailDto {
    @IsEmail({}, { message: 'Votre email est invalide' })
    email: string;
}