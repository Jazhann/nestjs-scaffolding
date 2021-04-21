import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';

import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { UserServiceModule } from './user/services/userService.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    UserServiceModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        // Place your mongodb uri
        uri: '',
      }),
    })
  ],
  controllers: [AppController],
  providers: [AuthService],
})
export class AppModule {}
