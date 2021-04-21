import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from 'src/user/models/user.model';
import { UserService } from 'src/user/services/user.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    exports: [UserService, MongooseModule],
    providers: [UserService],
})
export class UserServiceModule {}
