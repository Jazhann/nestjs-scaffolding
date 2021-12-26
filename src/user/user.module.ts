import { Module } from '@nestjs/common';

import { UserController } from 'src/user/user.controller';

import { UserService } from 'src/user/user.service';
import { DAOModule } from '../DAOs/DAO.module';

@Module({
    imports: [
        DAOModule,
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
