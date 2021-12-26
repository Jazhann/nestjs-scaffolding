import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Types } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { UserDTO } from 'src/user/DTOs/user.DTO';
import { UserDAO } from 'src/DAOs/user.DAO';
import { Constants } from 'src/common/constants';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserDAO') private readonly userDAO: UserDAO,
    ) { }

    /**
     * It creates a new User
     * @param newUser object
     * @returns new user object created
     */
    async createUser(newUser: UserDTO) {
        const checkUser = await this.userDAO.checkUserEmail(newUser.email.toLocaleLowerCase());
        if (checkUser != null) {
            throw new HttpException({
                message: Constants.userAlreadyExists,
            }, Constants.ok);
        } else {
            newUser.password = await bcrypt.hash(newUser.password, Constants.rounds);
            return await this.userDAO.createUser(newUser);
        }
    }

    /**
     * It get an User by id
     * @param id string
     * @returns user object
     */
    async getUser(id: string) {
        return await this.userDAO.getUser(Types.ObjectId(id));
    }

    /**
     * It get all Users
     * @returns user object array
     */
    async getUsers() {
        return await this.userDAO.getUsers();
    }

    /**
     * It update an user
     * @param id object, user id
     * @param user object
     * @returns update log
     */
    async updateUser(id: string, user: UserDTO) {
        const oldUser = await this.getUser(id);
        const checkUserEmail = await this.userDAO.checkUserEmail(user.email.toLocaleLowerCase());
        if (checkUserEmail != null && checkUserEmail._id.toString() !== oldUser._id.toString()) {
                throw new HttpException({
                    message: Constants.userWithThisEmail,
                }, Constants.ok);
        } else {
            if (user.password !== null) {
                if (oldUser.password !== user.password) {
                    user.password = await bcrypt.hash(user.password, Constants.rounds);
                }
            } else {
                user.password = oldUser.password;
            }
            return await this.userDAO.updateUser(Types.ObjectId(id), user);
        }
    }

    /**
     * It delete an user
     * @param id string, user id
     * @returns deletion log
     */
    async deleteUser(id: string) {
        const deletedUser = await this.userDAO.deleteUser(Types.ObjectId(id));
        return deletedUser;
    }
}
