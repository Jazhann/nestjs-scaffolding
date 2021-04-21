import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';

import { UserDTO } from 'src/user/DTOs/user.DTO';
import { UserDAO } from 'src/user/user.DAO';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class UserController {

    constructor(
        private readonly usersDAO: UserDAO,
    ) { }

    @Post()
    async createUser(@Body() newUser: UserDTO) {
        return await this.usersDAO.createUser(newUser);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getUser(@Param('id') id: string) {
        return await this.usersDAO.getUser(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUsers() {
        return await this.usersDAO.getUsers();
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() user: UserDTO) {
        return await this.usersDAO.updateUser(id, user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteIser(@Param('id') id: string) {
        return await this.usersDAO.deleteUser(id);
    }
}
