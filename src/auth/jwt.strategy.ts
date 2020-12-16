import { PassportStrategy } from '@nestjs/passport';
import {  Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51',
        });
    }

    async validate(payload: JwtPayload) {
        const {email} = payload;
        const user = await this.userRepository.findOne({email});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
