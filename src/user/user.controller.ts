import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';

import { UserDTO } from 'src/user/DTOs/user.DTO';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class UserController {

    constructor(
        private readonly usersService: UserService,
    ) { }

    @Post()
    async createUser(@Body() newUser: UserDTO) {
        return await this.usersService.createUser(newUser);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getUser(@Param('id') id: string) {
        return await this.usersService.getUser(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUsers() {
        return await this.usersService.getUsers();
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() user: UserDTO) {
        return await this.usersService.updateUser(id, user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteIser(@Param('id') id: string) {
        return await this.usersService.deleteUser(id);
    }
}
