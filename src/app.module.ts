import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './auth/user.entity';
import { AuthAdminModule } from './auth-admin/auth-admin.module';
import { Admin } from './auth-admin/admin.entity';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'user',
      entities: [User, Admin],
      synchronize: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthAdminModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
