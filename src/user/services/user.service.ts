import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDTO } from 'src/user/DTOs/user.DTO';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class UserService {

    constructor(
         @InjectModel('User') private readonly userModel: Model<User>,
    ) {}

    async findEmailUser(email: string): Promise<User> {
        return this.userModel.findOne({email}).exec();
    }

    async createUser(newUser: UserDTO): Promise<User> {
        const createdUser = new this.userModel(newUser);
        return createdUser.save();
    }

    async getUser(id): Promise<User> {
        return this.userModel.findOne({_id: id}).exec();
    }

    async checkUserEmail(emailUser: string): Promise<User> {
        return this.userModel.findOne({email: emailUser}).exec();
    }

    async getUsers(): Promise<User[]> {
        return this.userModel.find().exec(); 
    }

    async updateUser(id, user: UserDTO): Promise<any> {
        return this.userModel.updateOne({_id: id}, user);
    }

    async deleteUser(id): Promise<any> {
        return this.userModel.deleteOne({_id: id});
    }
}
