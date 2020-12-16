import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, ServiceUnavailableException, NotFoundException, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { transporter } from './email/emailSender';
import * as randomstring from 'randomstring';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SignUpInfoDto } from './dto/signup-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfoDto } from './dto/user-info.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(signUpInfoDto: SignUpInfoDto): Promise<Object>{
        console.log(signUpInfoDto)
        const user = new User();
        user.firstname = signUpInfoDto.firstname;
        user.lastname = signUpInfoDto.lastname;
        signUpInfoDto.address ? user.address = signUpInfoDto.address: null;
        signUpInfoDto.city ? user.city = signUpInfoDto.city: null;
        signUpInfoDto.zipcode? user.zipcode = signUpInfoDto.zipcode: null;
        user.phone = signUpInfoDto.phone;

        user.email = signUpInfoDto.email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(signUpInfoDto.password, user.salt);
        user.secretToken = randomstring.generate();

        try {
            await user.save();
            let mailOptions = {
                from: 'luchiwalaseyne@gmail.com',
                to: user.email.toLocaleLowerCase(),
                subject: 'Confirmation de compte Luchiwa sushi',
                text: 'Afin de valider votre compte, veuillez joindre l\'url suivante : http://localhost:4200/validation/' + user.secretToken
            };
            transporter.sendMail(mailOptions, function(err, data){
                if(err){
                    throw new ServiceUnavailableException('La création de compte a échouée, l\'email de validation n\'a pas pu être envoyé')               
                }
            })
            return {message:'Votre compte a été créé avec succès, un email de validation vient de vous être envoyé'}
        } catch(error){
            if(error.code === 11000){
                throw new ConflictException('Cet email existe déjà')
            }
        }
    }

    async validateUserPassword(authCredentialsDto): Promise<any>{
        const { email, password} = authCredentialsDto
        const user = await this.findOne({email});
        console.log(user)
        if(!user.isActive){
            throw new UnauthorizedException('Votre compte n\'a pas encore été activé, Un email d\'activation vous a été envoyé afin de l\'activé.')
        }
        if(await user.validatePassword(password)){
            return user;
        } else {
            return null
        }
    }


    async validateUserAccount(token): Promise<Object>{
        const user = await this.find({where: {"secretToken": token.token}})

        if(!user) {
            throw new NotFoundException("Aucun utilisateur n'a pu être validé")
        }

        const update = { secretToken: null, isActive: true }
        const userUpdate = await this.update(token, update)

        return {message: "Votre compte a été validé avec succès !"}
    }

    async askUpdatePassword(user: User): Promise<Object>{
        if(!user){
            throw new NotFoundException("Aucun utilisateur n'a pu être trouvé")
        }

        if(!user.isActive){
            throw new NotFoundException("Votre compte n'est pas validé")
        }

        try {
            const secretToken = randomstring.generate();
            const update = { secretToken: secretToken }
            const userUpdate = await this.update(user._id, update)
            let mailOptions = {
                from: 'luchiwalaseyne@gmail.com',
                to: user.email.toLocaleLowerCase(),
                subject: 'Modification de mot passe Luchiwa sushi',
                text: 'Afin de modifier votre mot de passe, veuillez joindre l\'url suivante : http://localhost:4200/update_password/' + secretToken
            };
            transporter.sendMail(mailOptions, function(err, data){
                if(err){
                    throw new ServiceUnavailableException('L\'email de modification de mot de passe n\'a pas pu être envoyé')               
                }
            })
        } catch(error){
            if(error){
                throw new NotFoundException('Le service de modification de mot de passe est inaccessible')
            }
        }

        return {message: "Un email de modification de mot de passe vient de vous être envoyé !"}
    }

    async forgetPassword(email:string): Promise<Object>{
        const user = await this.findOne({where: {"email": email}})

        if(!user){
            throw new NotFoundException("Aucun comte associé à cet email")
        }
        if(!user.isActive){
            throw new NotFoundException("Votre compte n'est pas validé")
        }

        try {
            const secretToken = randomstring.generate();
            const update = { secretToken: secretToken }
            const userUpdate = await this.update(user._id, update)
            let mailOptions = {
                from: 'luchiwalaseyne@gmail.com',
                to: user.email.toLocaleLowerCase(),
                subject: 'Modification de mot passe Luchiwa sushi',
                text: 'Afin de modifier votre mot de passe, veuillez joindre l\'url suivante : http://localhost:4200/update_password/' + secretToken
            };
            transporter.sendMail(mailOptions, function(err, data){
                if(err){
                    throw new ServiceUnavailableException('L\'email de modification de mot de passe n\'a pas pu être envoyé')               
                }
            })
        } catch(error){
            if(error){
                throw new NotFoundException('Le service de modification de mot de passe est inaccessible')
            }
        }

        return {message: "Un email de modification de mot de passe vient de vous être envoyé !"}
    }

    async updatePassword(token, updatePassword: UpdatePasswordDto): Promise<Object>{
        const user = await this.findOne({where: {"secretToken": token.secretToken}})
        if(updatePassword.password !== updatePassword.checkPassword){
            throw new NotAcceptableException("Les mots de passes doivent être identiques");
        }
        if(!user) {
            throw new NotFoundException("Aucun utilisateur n'a pu être validé")
        }

        const update = {password: await this.hashPassword(updatePassword.password, user.salt), secretToken: null}
        const userUpdate = await this.update(token, update)

        return {message: "Votre mot de passe a été modifié avec succès !"}
    }

   /* async updateUser(user: User, userInfoDto: UserInfoDto): Promise<Object>{
        const userInfo = {userInfo: userInfoDto}
        const userUpdate = await this.update(user._id, userInfo)
        return {}
    }*/

    private async hashPassword(password: string, salt: string){
        return bcrypt.hash(password, salt)
    }
}