import { Module } from '@nestjs/common';

import { UserController } from 'src/user/user.controller';

import { UserDAO } from 'src/user/user.DAO';
import { UserServiceModule } from './services/userService.module';

@Module({
    imports: [
        UserServiceModule,
    ],
    controllers: [UserController],
    providers: [UserDAO],
})
export class UserModule {}
