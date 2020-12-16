import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminController } from './auth-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    TypeOrmModule.forFeature([AdminRepository]),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 1800,
      }
    }),
    PassportModule.register({defaultStrategy: 'jwt'})
  ],
  providers: [
    AuthAdminService,
  ],
  exports:[
    PassportModule
  ],
  controllers: [AuthAdminController]
})
export class AuthAdminModule {}
