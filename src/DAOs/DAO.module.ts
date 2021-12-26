import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from 'src/user/models/user.model';
import { UserDAO } from 'src/DAOs/user.DAO';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    exports: [UserDAO, MongooseModule],
    providers: [UserDAO],
})
export class DAOModule {}
