"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const emailSender_1 = require("./email/emailSender");
const randomstring = require("randomstring");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('AuthService');
    }
    async signUp(signUpInfoDto) {
        const user = new user_entity_1.User();
        user.firstname = signUpInfoDto.firstname;
        user.lastname = signUpInfoDto.lastname;
        signUpInfoDto.address ? user.address = signUpInfoDto.address : null;
        signUpInfoDto.city ? user.city = signUpInfoDto.city : null;
        signUpInfoDto.zipcode ? user.zipcode = signUpInfoDto.zipcode : null;
        user.phone = signUpInfoDto.phone;
        const isUniqueEmail = await this.isUniqueEmail(signUpInfoDto.email);
        if (!isUniqueEmail) {
            throw new common_1.ConflictException('Cet email existe déjà, veuillez utiliser en utiliser un autre');
        }
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
                text: 'Afin de valider votre compte, veuillez joindre l\'url suivante : http://localhost:4200/auth/validation/' + user.secretToken
            };
            emailSender_1.transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    throw new common_1.ServiceUnavailableException('La création de compte a échouée, l\'email de validation n\'a pas pu être envoyé');
                }
            });
            this.logger.verbose(`The user signup: ${signUpInfoDto.email} succeed`);
            return { message: 'Votre compte a été créé avec succès, un email de validation vient de vous être envoyé' };
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Cet email existe déjà');
            }
        }
    }
    async validateUserPassword(authCredentialsDto) {
        const { email, password } = authCredentialsDto;
        const user = await this.findOne({ email });
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Votre compte n\'a pas encore été activé, Un email d\'activation vous a été envoyé afin de l\'activé.');
        }
        if (await user.validatePassword(password)) {
            return user;
        }
        else {
            return null;
        }
    }
    async validateUserAccount(token) {
        const user = await this.find({ where: { "secretToken": token.token } });
        if (user.length !== 1) {
            throw new common_1.NotFoundException("Aucun utilisateur n'a pu être validé");
        }
        const update = { secretToken: null, isActive: true };
        const userUpdate = await this.update(user[0]._id, update);
        this.logger.verbose(`The account of token ${token.token} is validate`);
        return { message: "Félicitaition ! Votre compte a été validé avec succès !" };
    }
    async askUpdatePassword(user) {
        if (!user) {
            throw new common_1.NotFoundException("Aucun utilisateur n'a pu être trouvé");
        }
        if (!user.isActive) {
            throw new common_1.NotFoundException("Votre compte n'est pas validé");
        }
        try {
            const secretToken = randomstring.generate();
            const update = { secretToken: secretToken };
            const userUpdate = await this.update(user._id, update);
            let mailOptions = {
                from: 'luchiwalaseyne@gmail.com',
                to: user.email.toLocaleLowerCase(),
                subject: 'Modification de mot passe Luchiwa sushi',
                text: 'Afin de modifier votre mot de passe, veuillez joindre l\'url suivante : http://localhost:4200/auth/updatepassword/' + secretToken
            };
            emailSender_1.transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    throw new common_1.ServiceUnavailableException('L\'email de modification de mot de passe n\'a pas pu être envoyé');
                }
            });
        }
        catch (error) {
            if (error) {
                throw new common_1.NotFoundException('Le service de modification de mot de passe est inaccessible');
            }
        }
        this.logger.verbose(`The password change request of ${user.email} has been created`);
        return { message: "Un email de modification de mot de passe vient de vous être envoyé !" };
    }
    async forgetPassword(email) {
        const user = await this.findOne({ where: { "email": email } });
        if (!user) {
            throw new common_1.NotFoundException("Aucun comte associé à cet email");
        }
        if (!user.isActive) {
            throw new common_1.NotFoundException("Votre compte n'est pas validé");
        }
        try {
            const secretToken = randomstring.generate();
            const update = { secretToken: secretToken };
            const userUpdate = await this.update(user._id, update);
            let mailOptions = {
                from: 'luchiwalaseyne@gmail.com',
                to: user.email.toLocaleLowerCase(),
                subject: 'Modification de mot passe Luchiwa sushi',
                text: 'Afin de modifier votre mot de passe, veuillez joindre l\'url suivante : http://localhost:4200/auth/updatepassword/' + secretToken
            };
            emailSender_1.transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    throw new common_1.ServiceUnavailableException('L\'email de modification de mot de passe n\'a pas pu être envoyé');
                }
            });
        }
        catch (error) {
            if (error) {
                throw new common_1.NotFoundException('Le service de modification de mot de passe est inaccessible');
            }
        }
        this.logger.verbose(`The password change request of ${email} has been created`);
        return { message: "Un email de modification de mot de passe vient de vous être envoyé !" };
    }
    async updatePassword(token, updatePassword) {
        const user = await this.findOne({ where: { "secretToken": token.secretToken } });
        if (updatePassword.password !== updatePassword.checkPassword) {
            throw new common_1.NotAcceptableException("Les mots de passes doivent être identiques");
        }
        if (!user) {
            throw new common_1.NotFoundException("Aucun utilisateur n'a pu être validé");
        }
        const update = { password: await this.hashPassword(updatePassword.password, user.salt), secretToken: null };
        const userUpdate = await this.update(token, update);
        this.logger.verbose(`The password update has been made successful`);
        return { message: "Votre mot de passe a été modifié avec succès !" };
    }
    async updateUser(user, userInfoDto) {
        const userUpdate = await this.update(user._id, userInfoDto);
        this.logger.verbose(`The update of account ${user.email} has been made successfuly`);
        return userUpdate;
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
    async isUniqueEmail(email) {
        const user = await this.findOne({ email });
        let isUser = null;
        user ? isUser = false : isUser = true;
        return isUser;
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map