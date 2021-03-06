import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';

import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { DAOModule } from './DAOs/DAO.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DAOModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        // Place your mongodb uri
        uri: 'mongodb+srv://weedadmin:pantalonesdecolores@cluster0.e08ym.mongodb.net/weed?retryWrites=true&w=majority',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AuthService],
})
export class AppModule {}
